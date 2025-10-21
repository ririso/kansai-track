"use client";

import { useSession } from "next-auth/react";

export default function Greeting() {
  const { data: session } = useSession();

  const userName = session?.user?.name ?? "ゲスト";
  const message = "開発＆返済がんばりましょう！";

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {userName === "ゲスト"
          ? "おかえりなさい！"
          : `おかえりなさい、${userName}さん！`}
      </h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
