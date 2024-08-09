import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Meus dados | Imobiliária JH",
  description: "Venha conhecer a melhor imobiliária da região.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}