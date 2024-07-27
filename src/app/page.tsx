import SearchSection from "../components/searchSection/SearchSection";
import realEstateService, { NegotiationParams } from "../services/realEstateService";
import SlideSection from "../components/slideSection/SlideSection";

const createNegotiationParams = (negotiation: string): NegotiationParams => {
  return { negotiation }
}

export default async function Home() {

  const negotiationParamsSale = createNegotiationParams('venda')
  const negotiationParamsRent = createNegotiationParams('locacao')

  const newestRealEstate = await realEstateService.getNewestRealEstate()
  const featuredRealEstate = await realEstateService.getFeaturedRealEstate()
  const realEstateSale = await realEstateService.getRealEstateByNegotiation(negotiationParamsSale)
  const realEstateRent = await realEstateService.getRealEstateByNegotiation(negotiationParamsRent)

  return (
    <>
      <main>
        <SearchSection />
        <SlideSection realEstate={newestRealEstate} title="Novidades" />
        <SlideSection realEstate={featuredRealEstate} title="Imóveis em destaque" />
        <SlideSection realEstate={realEstateSale} title="Imóveis à venda" />
        <SlideSection realEstate={realEstateRent} title="Imóveis para locação" />
      </main>
    </>
  )
}

