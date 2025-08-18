// app/layout.tsx
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import "./globals.css";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
