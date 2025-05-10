"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Googleでログイン
      </button>
    </div>
  );
}
