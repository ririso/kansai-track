"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">ログイン</h1>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          {loading ? "ログイン中..." : "Googleでログイン"}
        </button>
        <p className="text-sm text-gray-500 mt-6">
          奨学金管理アプリにログインします。
        </p>
      </div>
    </div>
  );
}
