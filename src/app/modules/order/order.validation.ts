import { z } from 'zod';

const createOrderValidation = z.object({
    body: z.object({
  fullName: z.string({required_error: "Fullname is required!"}),
  email: z.string({required_error: "Email is required!"}),
  phone: z.string({required_error: "Phone is required!"}),
  country: z.string({required_error: "Country is required!"}),
  state: z.string({required_error: "State is required!"}),
  address: z.string({required_error: "Address is required!"}),
  orderNotes: z.string().optional(),

  productId: z.string().optional(),
  weight: z.number().optional(),
    quantity: z.number().optional(),
    price: z.number().optional(),

  cartItems: Array<{
     productId: z.string().optional(),
  weight: z.number().optional(),
    quantity: z.number().optional(),
    price: z.number().optional(),
  }>;
  }),
});

export const OrderValidation = {
  createOrderValidation,
};
