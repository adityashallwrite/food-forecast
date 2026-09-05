export const userRoles = ["student", "faculty", "admin"] as const;

export type UserRole = (typeof userRoles)[number];
