import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderToDB = async (payload: IOrder): Promise<IOrder> => {
  const createOrder = await Order.create(payload);
  if (!createOrder) {
    throw new ApiError(
      StatusCodes.OK,
      'Failed to create order, please try again'
    );
  }
  return createOrder;
};

export const OrderService = {
  createOrderToDB,
};
