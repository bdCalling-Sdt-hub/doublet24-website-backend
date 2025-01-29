import { z } from 'zod';

const createProductZodSchema = z.object({
  name: z.string({ required_error: 'Product name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  brand: z.string().optional(),
  weight: z.number({ required_error: 'Weight is required' }).int(),
  description: z.string({ required_error: 'Product description is required' }),
  category: z.string({ required_error: 'Category is required' }),
  status: z.enum(['In Stock', 'Out of Stock'], {
    required_error: 'Status is required',
  }),
});

const updateProductZodSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  brand: z.string().optional(),
  weight: z.number().int().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['In Stock', 'Out of Stock']).optional(),
  imagesToDelete: z.array(z.string()).optional(),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
