import { z } from 'zod';

export const createProjectCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateProjectCategoryType = z.infer<
  typeof createProjectCategorySchema
>;
