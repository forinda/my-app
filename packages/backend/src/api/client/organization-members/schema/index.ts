import { z } from 'zod';
export const addMemberToOrRemoveFromOrgSchema = z.object({
  organization_id: z.number({ message: 'Organization ID is required' }),
  emails: z
    .array(z.string().email().toLowerCase())
    .min(1, 'At least one user is required'),
  designation_id: z.number(),
  created_by: z.number(),
  updated_by: z.number()
});

export const respondToOrgInviteSchema = z.object({
  invite_id: z.number(),
  action: z.enum(['accepted', 'rejected'])
});

export const fetchUserorganizationInvitesSchema = z.object({
  user_id: z.coerce.number()
});

export type AddMemberToOrRemoveFromOrganizationType = z.infer<
  typeof addMemberToOrRemoveFromOrgSchema
>;

export type RespondToOrgInviteType = z.infer<typeof respondToOrgInviteSchema>;

export const filterOrganizationMembersSchema = z.object({
  current_organization_id: z.string()
});

export type FilterOrganizationmembersType = z.infer<
  typeof filterOrganizationMembersSchema
>;

export type FetchUserOrganizationInvitesType = z.infer<
  typeof fetchUserorganizationInvitesSchema
>;
