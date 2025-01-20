import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { ISubcategory } from './subcategory.interface';

const subcategorySchema = new Schema<ISubcategory>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
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
  },
  { timestamps: true }
);

subcategorySchema.pre('save', async function (next) {
  const isExistCategory = await Subcategory.findOne({
    categoryId: this.categoryId,
    name: this.name,
  });
  if (isExistCategory) {
    //unlink file
    unlinkFile(this.image);
    throw new ApiError(
      StatusCodes.CONFLICT,
      'This subcategory already exists within the selected category. Please use a different name and try again.'
    );
  }
  next();
});

export const Subcategory = model<ISubcategory>(
  'Subcategory',
  subcategorySchema
);
