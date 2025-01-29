import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { AboutService } from './about.service';

const createAboutContent = catchAsync(async (req: Request, res: Response) => {
  const image = getSingleFilePath(req.files, 'image');

  const result = await AboutService.createAboutContentToDB({
    image,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About content has been created successfully',
    data: result,
  });
});

const getAllAboutContent = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.getAllAboutContentFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All about content has been retrieve successfully',
    data: result,
  });
});

const updateAboutContent = catchAsync(async (req: Request, res: Response) => {
  const image = getSingleFilePath(req.files, 'image');

  const result = await AboutService.updateAboutContentToDB(req.params.id, {
    image,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About content has been updated successfully',
    data: result,
  });
});

const deleteAboutContent = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.deleteAboutContentToDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About content has been delete successfully',
    data: result,
  });
});

export const AboutController = {
  createAboutContent,
  getAllAboutContent,
  deleteAboutContent,
  updateAboutContent,
};
