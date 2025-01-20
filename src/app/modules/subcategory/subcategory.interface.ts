import { Types } from 'mongoose';

export type ISubcategory = {
  categoryId: Types.ObjectId;
  name: string;
  image: string;
};
