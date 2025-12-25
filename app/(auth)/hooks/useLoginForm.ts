"use client";

import { useState } from "react";
import { loginSchema, LoginData } from "../schema";

export default function useLoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
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

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (fieldName) {
          fieldErrors[fieldName as string] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    // ✅ Valid login (dummy for sprint 1)
    setErrors({});
    alert(`Logged in as: ${formData.email}`);

    setFormData({
      email: "",
      password: "",
    });
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
}
