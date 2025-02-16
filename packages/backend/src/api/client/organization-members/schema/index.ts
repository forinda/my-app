import { z } from 'zod';
export const addMemberToOrRemoveFromOrgSchema = z.object({
  organization_id: z.string({ message: 'Organization ID is required' }),
  users: z.array(z.string()).min(1, 'At least one user is required'),
  created_by: z.number(),
  updated_by: z.number()
});

export type AddMemberToOrRemoveFromOrganizationType = z.infer<
  typeof addMemberToOrRemoveFromOrgSchema
>;

export const filterOrganizationMembersSchema = z.object({
  current_organization_id: z.string()
});

export type FilterOrganizationmembersType = z.infer<
  typeof filterOrganizationMembersSchema
>;
