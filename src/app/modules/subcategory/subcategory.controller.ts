import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { SubcategoryService } from './subcategory.service';

const createSubcategory = catchAsync(async (req: Request, res: Response) => {
  const image = getSingleFilePath(req.files, 'image');

  const result = await SubcategoryService.createSubcategoryToDB({
    image,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subcategory has been created successfully',
    data: result,
  });
});

const getAllSubcategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubcategoryService.getAllSubcategoryFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All Subcategories has been retrieve successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getSingleSubcategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubcategoryService.getSingleSubcategoryFromDB(
    req.params.id
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subcategory has been retrieve successfully',
    data: result,
  });
});

const updateSubcategory = catchAsync(async (req: Request, res: Response) => {
  const image = getSingleFilePath(req.files, 'image');

  const result = await SubcategoryService.updateSubcategoryToDB(req.params.id, {
    image,
    ...req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subcategory has been updated successfully',
    data: result,
  });
});

const deleteSubcategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubcategoryService.deleteSubcategoryToDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category has been delete successfully',
    data: result,
  });
});

export const SubcategoryController = {
  createSubcategory,
  getAllSubcategory,
  getSingleSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
