import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../types/common';
import getOrderID from '../../../util/orderId';
import QueryBuilder from '../../builder/QueryBuilder';
import { Product } from '../product/product.model';
import { ORDER_STATUS } from './order.constant';
import { IOrder, IOrderStatus } from './order.interface';
import { Order } from './order.model';

const createOrderToDB = async (payload: IOrder): Promise<IOrder> => {
  const orderId = getOrderID();
  const newData = { ...payload, orderId };

  const createOrder = await Order.create(newData);
  if (!createOrder) {
    throw new ApiError(
      StatusCodes.OK,
      'Failed to create order, please try again'
    );
  }
  return createOrder;
};

const getAllOrdersFromDB = async (
  query: Record<string, unknown>
): Promise<IGenericResponse<IOrder[]>> => {
  const searchableFields = [
    'fullName',
    'email',
    'phone',
    'country',
    'state',
    'address',
    'orderId',
  ];
  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate(['productId', 'cartItems.productId'], {
      productId: 'name image',
      'cartItems.productId': 'name image',
    });

  const result = await orderQuery.modelQuery;

  const pagination = await orderQuery.getPaginationInfo();

  return { meta: pagination, data: result };
};

const updateOrderStatusToDB = async (
  id: string,
  status: IOrderStatus
): Promise<IOrder> => {
  const isOrderExist = await Order.findById(id);
  if (!isOrderExist) {
    throw new ApiError(StatusCodes.OK, "Order doesn't exist");
  }

  const immutableStatus = new Set(['CANCELED', 'DELIVERED']);
  if (immutableStatus.has(isOrderExist.status)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `This order already ${isOrderExist.status.toLocaleLowerCase()}, you can't change the status`
    );
  }

  if (isOrderExist.status === status) {
    throw new ApiError(StatusCodes.OK, `Order is already ${status}`);
  }

  isOrderExist.status = status;
  await isOrderExist.save();

  return isOrderExist;
};

const getOrderOverviewFromDB = async (): Promise<Record<string, unknown>> => {
  const totalProducts = await Product.countDocuments({ status: 'In Stock' });
  const totalDeliverOrder = await Order.countDocuments({ status: 'DELIVERED' });
  const totalPendingOrder = await Order.countDocuments({ status: 'PENDING' });
  const totalCancelOrder = await Order.countDocuments({ status: 'CANCELED' });

  //monthly order progress
  const currentYear = new Date().getFullYear();
  const months = [
    { name: 'Jan', order: 0 },
    { name: 'Feb', order: 0 },
    { name: 'Mar', order: 0 },
    { name: 'Apr', order: 0 },
    { name: 'May', order: 0 },
    { name: 'Jun', order: 0 },
    { name: 'Jul', order: 0 },
    { name: 'Aug', order: 0 },
    { name: 'Sep', order: 0 },
    { name: 'Oct', order: 0 },
    { name: 'Nov', order: 0 },
    { name: 'Dec', order: 0 },
  ];

  const totalOrders = await Order.aggregate([
    {
      $match: {
        status: {
          $in: ORDER_STATUS,
        },
      },
    },
    {
      $project: {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
      },
    },
    {
      $match: { year: currentYear },
    },
    {
      $group: {
        _id: { year: '$year', month: '$month' },
        totalOrder: { $sum: 1 },
      },
    },
  ]);

  totalOrders.forEach(order => {
    const monthIndex = order._id.month - 1;
    months[monthIndex].order = order.totalOrder;
  });

  return {
    totalProducts,
    totalDeliverOrder,
    totalCancelOrder,
    totalPendingOrder,
    monthlyOverview: months,
  };
};

export const OrderService = {
  createOrderToDB,
  getAllOrdersFromDB,
  updateOrderStatusToDB,
  getOrderOverviewFromDB,
};
