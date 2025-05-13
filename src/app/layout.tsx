// app/layout.tsx
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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
          <Header />
          <main className="p-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
