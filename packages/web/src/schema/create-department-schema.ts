import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string(),
  description: z.string(),
});


export type CreateDepartmentType = z.infer<typeof createDepartmentSchema>;
