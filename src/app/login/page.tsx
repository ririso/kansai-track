"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">ログイン</h1>
      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Googleでログイン
      </button>
    </div>
  );
}
