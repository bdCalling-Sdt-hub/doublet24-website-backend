import { z } from 'zod';

const createSubcategoryZodSchema = z.object({
  categoryId: z.string({ required_error: 'CategoryId is required!' }),
  name: z.string({ required_error: 'Category name is required!' }),
});

const updateSubcategoryZodSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().optional(),
});

export const SubcategoryValidation = {
  createSubcategoryZodSchema,
  updateSubcategoryZodSchema,
};
