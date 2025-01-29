import { model, Schema } from 'mongoose';
import { ORDER_STATUS } from './order.constant';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },

    orderNotes: { type: String, required: false, trim: true },

    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: false },
    weight: { type: String, required: false, min: 0 },
    quantity: { type: String, required: false, min: 1 },
    price: { type: String, required: false, min: 0 },

    cartItems: Array<{
      productId: { type: Schema.Types.ObjectId; ref: 'Product'; require: true };
      weight: { type: String; required: false; min: 0 };
      quantity: { type: String; required: false; min: 1 };
      price: { type: String; required: false; min: 0 };
    }>,
    status: {
      type: String,
      enum: ORDER_STATUS,
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema);
