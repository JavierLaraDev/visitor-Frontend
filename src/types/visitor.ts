
export type VisitorType = "STUDENT" | "EXTERNAL"| "TEACHER" | "ADMINISTRATIVE" ;
export type AttentionStatus = "PENDING" | "ATTENDED";
export interface Visitor {
  id: number;

  firstName: string;
  middleName: string | null;
  lastName: string;
  secondLastName: string | null;

  phone: string;

  visitorType: VisitorType;   // enum, no string suelta
  major: string | null;       // OPCIONAL como en Prisma
  reason: string;

  status: AttentionStatus;    // enum

  registeredById: number;     // viene del backend
  createdAt: string;          // ISO date string
}
