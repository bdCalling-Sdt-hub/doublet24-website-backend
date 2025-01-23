import { Model, Types } from 'mongoose';

export type IProduct = {
  name: string;
  price: number;
  brand?: string;
  weight: number;
  description: string;
  category: Types.ObjectId;
  image: string[];
  status: 'In Stock' | 'Out of Stock';
};

export type ProductModel = {} & Model<IProduct>;
