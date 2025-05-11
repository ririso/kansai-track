"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessage = (() => {
    if (!error) return null;
    switch (error) {
      case "OAuthAccountNotLinked":
        return "このGoogleアカウントはすでに別のログイン方法とリンクされています。";
      case "AccessDenied":
        return "アクセスが拒否されました。";
      default:
        return "ログインに失敗しました。もう一度お試しください。";
    }
  })();

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">ログイン</h1>

      {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Googleでログイン
      </button>
    </div>
  );
}
