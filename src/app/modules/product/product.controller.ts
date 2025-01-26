import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getMultipleFilesPath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const images = getMultipleFilesPath(req.files, 'image');
  const data = { image: images, ...req.body };

  const result = await ProductService.createProductToDB(data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product has been created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProductsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All Product has been retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getSingleProductFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product has been retrieve successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const images = getMultipleFilesPath(req.files, 'image');
  const data = { image: images, ...req.body };

  const result = await ProductService.createProductToDB(data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product has been updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.deleteProductToDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product has been deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
};
