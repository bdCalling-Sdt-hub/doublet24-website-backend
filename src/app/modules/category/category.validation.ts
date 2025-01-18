import { z } from 'zod';

const createCategoryZodSchema = z.object({
  name: z.string({ required_error: 'Category name is required!' }),
  description: z.string({
    required_error: 'Category description is required!',
  }),
});

const updateCategoryZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
};
