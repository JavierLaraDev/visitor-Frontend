export interface User {
  id: number;
  email: string;
  role: string;            // viene como "ADMIN", "CLIENT", etc.
  firstName: string;
  middleName?: string | null;
  lastName: string;
  secondLastName?: string | null;
  major: string;
  status: string;          // viene como "ACTIVE", "INACTIVE", etc.
}
export interface CreateUser {
  email: string;
  password: string;
  role: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  secondLastName?: string | null;
  major: string;
  status: string;
}
export interface AuthUser {
  id: number;
  email: string;
  role: "ADMIN" | "PASANTE";
}