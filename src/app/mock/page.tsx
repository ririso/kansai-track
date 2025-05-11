"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>読み込み中...</p>;
  if (!session) return <p>ログインが必要です</p>;

  return (
    <div className="p-8">
      <p>モック用デザイン</p>
      <h1 className="text-2xl">ようこそ、{session.user?.name} さん</h1>
      <p>メールアドレス: {session.user?.email}</p>
    </div>
  );
}
