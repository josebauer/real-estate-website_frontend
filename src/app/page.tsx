import SearchSection from "../components/searchSection/SearchSection";
import realEstateService, { FilterParams } from "../services/realEstateService";
import SlideSection from "../components/slideSection/SlideSection";

const createNegotiationParams = (negotiation: string): FilterParams => {
  return { negotiation }
}

export default async function Home() {

  const negotiationParamsSale = createNegotiationParams('venda')
  const negotiationParamsRent = createNegotiationParams('locação')

  const newestRealEstate = await realEstateService.getNewestRealEstate()
  const featuredRealEstate = await realEstateService.getFeaturedRealEstate()
  const realEstateSale = await realEstateService.getFilteredRealEstate(negotiationParamsSale)
  const realEstateRent = await realEstateService.getFilteredRealEstate(negotiationParamsRent)

  return (
    <>
      <main>
        <SearchSection />
        <SlideSection realEstate={newestRealEstate} title="Novidades" />
        <SlideSection realEstate={featuredRealEstate} title="Imóveis em destaque" />
        <SlideSection realEstate={realEstateSale.realEstate} title="Imóveis à venda" />
        <SlideSection realEstate={realEstateRent.realEstate} title="Imóveis para locação" />
      </main>
    </>
  )
}

