import { z } from 'zod';

const createAboutZodSchema = z.object({
  title: z.string({ required_error: 'Title is required!' }),
  description: z.string({
    required_error: 'About description is required!',
  }),
});

const updateAboutZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const AboutValidation = {
  createAboutZodSchema,
  updateAboutZodSchema,
};
