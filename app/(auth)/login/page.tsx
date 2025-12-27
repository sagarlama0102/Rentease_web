"use client";

import LoginForm from "../_components/LoginForm"; // adjust path if needed

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login to your account
                </h1>
                <LoginForm />
            </div>
        </div>
    );
}
