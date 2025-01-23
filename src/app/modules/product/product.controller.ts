import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getMultipleFilesPath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const images = getMultipleFilesPath(req.files, 'image');

  const data = { image: images, ...req.body };

  console.log(data);

  const result = await ProductService.createProductToDB(data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product has been created successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
};
