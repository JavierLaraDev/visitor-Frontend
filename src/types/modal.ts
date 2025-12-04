import { User } from "./User";

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