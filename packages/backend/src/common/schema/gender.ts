import { z } from 'zod';

export const genderSchema = z.enum(['Male', 'Female', 'Other']);
// .default('Other');

export type GenderType = z.infer<typeof genderSchema>;
