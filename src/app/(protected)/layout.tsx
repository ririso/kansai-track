// app/layout.tsx
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "./globals.css";
import { Providers } from "./provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login"); // 未ログインなら /login にリダイレクト
  }

  return (
    <html lang="ja">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-gray-50">
            <Header />
            <main className="flex-1 p-6">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
