
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/Provider";
import { geistMono, geistSans } from "@/lib/fonts";


export const metadata: Metadata = {
  title: "Mira",
  description: "Experience the perfect blend of instant communication and structured workspace. Chat, collaborate, and create—all in one beautifully minimal interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
