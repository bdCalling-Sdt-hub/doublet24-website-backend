import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryToDB = async (payload: ICategory): Promise<ICategory> => {
  const createCategory = await Category.create(payload);
  if (!createCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created category');
  }

  return createCategory;
};

const getAllCategoryFromDB = async (): Promise<ICategory[]> => {
  const result = await Category.find();
  return result;
};

const getSingleCategoryFromDB = async (
  id: string
): Promise<ICategory | null> => {
  const result = await Category.findById(id);
  return result;
};

const updateCategoryToDB = async (
  id: string,
  payload: ICategory
): Promise<ICategory | null> => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category doesn't exist!");
  }

  //unlike file
  if (payload.image) {
    unlinkFile(isExist.image);
  }

  const updateCategory = await Category.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updateCategory;
};

const deleteCategoryToDB = async (id: string): Promise<ICategory | null> => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category doesn't exist!");
  }

  //unlike file
  unlinkFile(isExist.image);

  const deleteCategory = await Category.findByIdAndDelete(id);

  return deleteCategory;
};

export const CategoryService = {
  createCategoryToDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  deleteCategoryToDB,
  updateCategoryToDB,
};
