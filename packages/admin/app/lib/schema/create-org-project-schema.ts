import { z } from 'zod';

export const createOrgProjectSchema = z.object({
  name: z.string(),
  category_id: z.coerce.number({ message: 'Please select a category' }),
  description: z.string(),
});

export type CreateOrgProjectType = z.infer<typeof createOrgProjectSchema>;
