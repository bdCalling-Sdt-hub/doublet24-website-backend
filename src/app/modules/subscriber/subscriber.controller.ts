import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SubscriberService } from './subscriber.service';

const createSubscriber = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriberService.createSubscriberToDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message:
      'Your information has been submitted successfully! We will process your request and get back to you soon.',
    data: result,
  });
});

const getSubscriberList = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriberService.getSubscriberListFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subscriber list retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const subscriberRepliedMessage = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await SubscriberService.subscriberRepliedMessageToDB(
      id,
      req.body.description
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Information has been replied successfully',
      data: result,
    });
  }
);

export const SubscriberController = {
  createSubscriber,
  getSubscriberList,
  subscriberRepliedMessage,
};
