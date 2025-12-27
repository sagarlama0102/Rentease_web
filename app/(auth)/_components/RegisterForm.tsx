"use client";

import useRegisterForm from "../hooks/useRegisterForm";
// Step 1: Define the interface
interface RegisterFormProps {
  onSwitch: () => void;
}

export default function RegisterForm({onSwitch}: RegisterFormProps) {
  const { formData, errors, handleChange, handleSubmit } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 border rounded-lg bg-white shadow-sm">
      
      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Create Account
      </button>

    </form>
  );
}
