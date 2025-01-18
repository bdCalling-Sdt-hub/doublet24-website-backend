import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subCategoriesCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

categorySchema.pre('save', async function (next) {
  const isExistCategory = await Category.findOne({ name: this.name });
  if (isExistCategory) {
    //unlink file
    unlinkFile(this.image);
    throw new ApiError(
      StatusCodes.CONFLICT,
      'The category already exists. Please choose a different name and try again!'
    );
  }
  next();
});

export const Category = model<ICategory>('Category', categorySchema);
