import { User } from '@/src/types/User';
import React, { useState } from 'react'
import { capitalize } from '@/src/utils/format';
export const useEditModal = (user:User,onSubmit: (data: Partial<User>) => void) => {
    const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [middleName, setMiddleName] = useState(user.middleName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [secondLastName, setSecondLastName] = useState(user.secondLastName ?? "");
  const [major, setMajor] = useState(user.major ?? "");
  const [role, setRole] = useState<string>(String(user.role));
  const [status, setStatus] = useState<string>(String(user.status));
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
        role: role as any,
        status: status as any,
      });
    } finally {
      setSaving(false);
    }
  };
  return {
    firstName,
    middleName,
    lastName,
    secondLastName,
    major,
    role,
    status,
    saving,
    setFirstName,
    setMiddleName,
    setLastName,
    setSecondLastName,
    setMajor,
    setRole,
    setStatus,
    handleSubmit,
  };
}
