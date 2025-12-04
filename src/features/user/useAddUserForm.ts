import { User } from '@/src/types/User';
import { capitalize } from '@/src/utils/format';
import { useState } from 'react'
export const useAddUserForm = (onSubmit: (data: Partial<User> & { password: string }) => Promise<void>) => {

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [status, setStatus] = useState("ACTIVE");
  const [password, setPassword] = useState("");

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await onSubmit({
        firstName: capitalize(firstName),
        middleName: middleName ? capitalize(middleName) : null,
        lastName: capitalize(lastName),
        secondLastName: secondLastName ? capitalize(secondLastName) : null,
        major: capitalize(major),
        email: email.trim().toLowerCase(),
        role,
        status,
        password,
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    firstName, middleName, lastName, secondLastName,
    major, email, role, status, password, saving,

    setFirstName, setMiddleName, setLastName, setSecondLastName,
    setMajor, setEmail, setRole, setStatus, setPassword,

    handleSubmit,
  };
};