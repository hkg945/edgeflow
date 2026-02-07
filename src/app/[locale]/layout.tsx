import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strategify - 可視化交易策略構建與驗證平台",
  description: "無需編碼，透過拖拉組件快速構建交易策略，並使用強大的回測系統驗證邏輯。讓量化交易變得簡單觸手可及。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#020817",
          colorInputBackground: "#1e293b",
          colorInputText: "#f8fafc",
        },
      }}
    >
      <html lang="zh-TW" className="dark">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
