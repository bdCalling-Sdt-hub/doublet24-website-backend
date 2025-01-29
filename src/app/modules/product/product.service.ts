import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { IGenericResponse } from '../../../types/common';
import QueryBuilder from '../../builder/QueryBuilder';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductToDB = async (payload: IProduct): Promise<IProduct> => {
  if (!payload.image || payload.image.length < 3) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'A product must have at least 3 images for proper display.'
    );
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (
  query: Record<string, unknown>
): Promise<IGenericResponse<IProduct[]>> => {
  const searchableFields = ['name', 'brand'];
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate(['category'], { category: 'name image' });

  const result = await productQuery.modelQuery;

  //get page information
  const pagination = await productQuery.getPaginationInfo();

  return { meta: pagination, data: result };
};

const getSingleProductFromDB = async (id: string): Promise<IProduct | null> => {
  const isExistProduct = await Product.findById(id).populate({
    path: 'category',
    select: 'name image',
  });
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist!");
  }
  return isExistProduct;
};

const updateProductToDB = async (
  id: string,
  payload: any
): Promise<IProduct | null> => {
  const isExistProduct = await Product.findById(id);
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist!");
  }

  //filter
  const updateImages = isExistProduct.image.filter(
    img => !payload.imagesToDelete.includes(img)
  );

  console.log(payload.imagesToDelete);

  //unlike delete files
  for (let img of payload.imagesToDelete) {
    unlinkFile(img);
  }

  //insert image
  if (payload.image && payload.image.length > 0) {
    updateImages.push(...payload.image);
  }

  //update product
  const updateData = {
    ...payload,
    image: updateImages.length > 0 ? updateImages : isExistProduct.image,
  };

  console.log(updateData);

  const updateProduct = await Product.findOneAndUpdate(
    { _id: id },
    updateData,
    {
      new: true,
    }
  );
  return updateProduct;
};

const deleteProductToDB = async (id: string): Promise<IProduct | null> => {
  const isExistProduct = await Product.findById(id);
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist!");
  }

  //unlink files
  if (isExistProduct) {
    for (let img of isExistProduct.image) {
      unlinkFile(img);
    }
  }

  const deleteProduct = await Product.findByIdAndDelete(id);
  return deleteProduct;
};

export const ProductService = {
  createProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductToDB,
  updateProductToDB,
};
