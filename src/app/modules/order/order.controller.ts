import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrderStatus } from './order.interface';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrderToDB({ ...req.body });
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'The order has been successfully created.',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All order has been retrieved successfully.',
    pagination: result.meta,
    data: result.data,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const status: IOrderStatus = req.body.status;
  const result = await OrderService.updateOrderStatusToDB(
    req.params.id,
    status
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `The order has been successfully ${req.body.status}`,
    data: result,
  });
});

const getOrderOverview = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrderOverviewFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Overview data has been retrieved successfully.',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderOverview,
};
