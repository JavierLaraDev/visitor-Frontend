import type { Visitor, VisitorType } from "@/src/types/visitor";
import { useState } from "react";
import { capitalize } from "@/src/utils/format";

export const useEditVisitorModal = (
  visitor: Visitor,
  onSubmit: (data: Partial<Visitor>) => void
) => {
  const [firstName, setFirstName] = useState(visitor.firstName ?? "");
  const [middleName, setMiddleName] = useState(visitor.middleName ?? "");
  const [lastName, setLastName] = useState(visitor.lastName ?? "");
  const [secondLastName, setSecondLastName] = useState(visitor.secondLastName ?? "");
  const [phone, setPhone] = useState(visitor.phone ?? "");
  const [major, setMajor] = useState(visitor.major ?? "");
  const [visitorType, setVisitorType] = useState<VisitorType>(visitor.visitorType);
  const [reason, setReason] = useState(visitor.reason ?? "");

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
        phone: phone.trim(),
        major: major ? capitalize(major) : null,
        visitorType,
        reason: reason.trim(),
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
    phone,
    major,
    visitorType,
    reason,
    saving,

    setFirstName,
    setMiddleName,
    setLastName,
    setSecondLastName,
    setPhone,
    setMajor,
    setVisitorType,
    setReason,

    handleSubmit,
  };
};
