import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
    },
    weight: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    image: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ['In Stock', 'Out of Stock'],
    },
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', productSchema);
