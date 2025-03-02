import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BNA-Vis · Interactive Bias Network Analysis for Machine Learning Projects",
  description: "Interactive Bias Network Analysis for Machine Learning Projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
