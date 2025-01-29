import { z } from 'zod';
import { ORDER_STATUS } from './order.constant';

const createOrderValidation = z.object({
  body: z
    .object({
      fullName: z.string({ required_error: 'Fullname is required!' }),
      email: z
        .string({ required_error: 'Email is required!' })
        .email('Invalid email format!'),
      phone: z.string({ required_error: 'Phone is required!' }),
      country: z.string({ required_error: 'Country is required!' }),
      state: z.string({ required_error: 'State is required!' }),
      address: z.string({ required_error: 'Address is required!' }),
      orderNotes: z.string().optional(),

      productId: z.string().optional(),
      weight: z.number().positive('Weight must be greater than 0!').optional(),
      quantity: z
        .number()
        .int()
        .positive('Quantity must be at least 1!')
        .optional(),
      price: z.number().positive('Price must be greater than 0!').optional(),

      cartItems: z
        .array(
          z.object({
            productId: z.string().optional(),
            weight: z
              .number()
              .positive('Weight must be greater than 0!')
              .optional(),
            quantity: z
              .number()
              .int()
              .positive('Quantity must be at least 1!')
              .optional(),
            price: z
              .number()
              .positive('Price must be greater than 0!')
              .optional(),
          })
        )
        .optional(),
      status: z.enum([...ORDER_STATUS] as [string, ...string[]]).optional(),
    })
    .refine(
      data => {
        const hasDirectOrder = !!(
          data.productId &&
          data.weight &&
          data.quantity &&
          data.price
        );
        const hasCartOrder = data.cartItems && data.cartItems.length > 0;

        if (!hasDirectOrder && !hasCartOrder) {
          return false;
        }
        return true;
      },
      {
        message:
          'Either a direct order (productId, weight, quantity, price) or cartItems must be provided!',
      }
    ),
});

export const OrderValidation = {
  createOrderValidation,
};
