import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header/Header";
import Footer from "./components/common/footer/Footer";

const inter = Inter({ subsets: ["latin"], weight: "variable"  });

export const metadata: Metadata = {
  title: "Início | Imobiliária JH",
  description: "Venha conhecer a melhor imobiliária da região.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
