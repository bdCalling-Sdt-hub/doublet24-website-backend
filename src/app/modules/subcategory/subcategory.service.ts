import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { IGenericResponse } from '../../../types/common';
import QueryBuilder from '../../builder/QueryBuilder';
import { ISubcategory } from './subcategory.interface';
import { Subcategory } from './subcategory.model';

const createSubcategoryToDB = async (
  payload: ISubcategory
): Promise<ISubcategory> => {
  const createSubcategory = await Subcategory.create(payload);
  if (!createSubcategory) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to created Subcategory'
    );
  }

  return createSubcategory;
};

const getAllSubcategoryFromDB = async (
  query: Record<string, unknown>
): Promise<IGenericResponse<ISubcategory[]>> => {
  const searchableFields = ['name'];
  const populateFields = ['categoryId'];
  const selectFields = { categoryId: 'name image' };
  const SubcategoryQuery = new QueryBuilder(Subcategory.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate(populateFields, selectFields);

  const result = await SubcategoryQuery.modelQuery;

  const pagination = await SubcategoryQuery.getPaginationInfo();

  return { meta: pagination, data: result };
};

const getSingleSubcategoryFromDB = async (
  id: string
): Promise<ISubcategory | null> => {
  const result = await Subcategory.findById(id);
  return result;
};

const updateSubcategoryToDB = async (
  id: string,
  payload: ISubcategory
): Promise<ISubcategory | null> => {
  const isExist = await Subcategory.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Subcategory doesn't exist!");
  }

  //unlike file
  if (payload.image) {
    unlinkFile(isExist.image);
  }

  const updateSubcategory = await Subcategory.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updateSubcategory;
};

const deleteSubcategoryToDB = async (
  id: string
): Promise<ISubcategory | null> => {
  const isExist = await Subcategory.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Subcategory doesn't exist!");
  }

  //unlike file
  unlinkFile(isExist.image);

  const deleteSubcategory = await Subcategory.findByIdAndDelete(id);

  return deleteSubcategory;
};

export const SubcategoryService = {
  createSubcategoryToDB,
  getAllSubcategoryFromDB,
  getSingleSubcategoryFromDB,
  updateSubcategoryToDB,
  deleteSubcategoryToDB,
};
