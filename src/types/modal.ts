import { User } from "./User";
import { Visitor } from "./visitor";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User> & { password: string }) => Promise<void>;
}

export interface CustomSelectProps {
  value: string;
  onChange: (newValue: string) => void;
}

export interface DeleteUserModalProps {
  isOpen: boolean;
  user: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export type AddVisitorPayload = Omit<
Visitor, "id" | "registeredById" | "createdAt">;

export interface AddVisitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddVisitorPayload) => Promise<void>;
}