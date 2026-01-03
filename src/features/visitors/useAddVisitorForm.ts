import { AttentionStatus, Visitor, VisitorType } from '@/src/types/visitor'
import { capitalize } from '@/src/utils/format';
import { useState } from 'react';
import React from 'react'

type AddVisitorPayload = Omit<Visitor, 'id' | 'registeredById' | 'createdAt'>;

export const useAddVisitorForm = (onSubmit: (data: AddVisitorPayload) => Promise<void>) => {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [visitorType, setVisitorType] = useState<VisitorType>("STUDENT");
    const [major, setMajor] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState<AttentionStatus>("PENDING");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
      await onSubmit({
        firstName: capitalize(firstName),
        middleName: middleName ? capitalize(middleName) : null,
        lastName: capitalize(lastName),
        secondLastName: secondLastName ? capitalize(secondLastName) : null,
        phone: phone.trim(),
        visitorType,
        major: major ? capitalize(major) : null,
        reason: reason.trim(),
        status,
      });
    } finally {
      setSaving(false);
    }
    }
    return {
        // valores
    firstName,
    middleName,
    lastName,
    secondLastName,
    phone,
    visitorType,
    major,
    reason,
    status,
    saving,
    error,

    // setters
    setFirstName,
    setMiddleName,
    setLastName,
    setSecondLastName,
    setPhone,
    setVisitorType,
    setMajor,
    setReason,
    setStatus,

    // acciones
    handleSubmit,
    }
}
