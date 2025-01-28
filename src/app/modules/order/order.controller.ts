import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const OrderController = {
  createOrder,
};
