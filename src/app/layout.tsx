import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import categoriesService from "@/services/categoriesService";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

export const metadata: Metadata = {
  title: "Início | Imobiliária JH",
  description: "Venha conhecer a melhor imobiliária da região.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const categories = await categoriesService.getCategories()

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <Header categories={categories} />
          {children}
          <Footer categories={categories} />
        </AuthProvider>
      </body>
    </html>
  );
}
