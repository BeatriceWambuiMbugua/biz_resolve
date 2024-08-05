// roles.ts

export const Roles = {
  ADMIN: 'admin',
  USER: 'user',
  // Add more roles if needed
};

export const RolePermissions = {
  [Roles.ADMIN]: ['read', 'write', 'delete'],
  [Roles.USER]: ['read'],
  // Define permissions for each role
};
