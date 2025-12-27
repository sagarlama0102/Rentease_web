"use client";

import { useState } from "react";
import { registerSchema, RegisterData } from "../schema";

export default function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issues) => {
        const fieldName = issues.path[0];
        if (fieldName) {
          fieldErrors[fieldName as string] = issues.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    // ✅ Valid data
    setErrors({});
    alert(`Registered: ${formData.name} (${formData.email})`);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
}
