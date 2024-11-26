export const permissionTable = {
  profile: ['edit', 'create'],
  role: ['create', 'update', 'list'],
  users: ['edit', 'list', 'create', 'update', 'deactivate', 'assign-role']
} as const;

type BareObject = {
  [k: string]: any;
};
type RoleMapper<R extends BareObject> = {
  [K in keyof R]: K extends string ? `${K}:${R[K][number]}` : never;
};
export type AuthorityModuleTypes = keyof typeof permissionTable;

export type AuthorityType = RoleMapper<
  typeof permissionTable
>[keyof typeof permissionTable];

// What we want to achieve is - user:list, user:edit
