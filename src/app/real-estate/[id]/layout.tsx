import SlideSection from "@/components/slideSection/SlideSection";
import realEstateService from "@/services/realEstateService";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Detalhes do imóvel | Imobiliária JH",
  description: "Venha conhecer a melhor imobiliária da região.",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const featuredRealEstate = await realEstateService.getFeaturedRealEstate()
  return (
    <>
      <main>
        {children}
        <SlideSection realEstate={featuredRealEstate} title="Veja outros imóveis" />
      </main>
    </>
  );
}