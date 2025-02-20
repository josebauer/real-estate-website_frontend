import SearchSection from "../components/searchSection/SearchSection";
import realEstateService, { FilterParams } from "../services/realEstateService";
import SlideSection from "../components/slideSection/SlideSection";
import Link from "next/link";
import styles from "./page.module.scss";

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
        <div className="d-flex justify-content-center">
          <Link className={styles.link} href="/real-estate" >
            Ver todos os imóveis
          </Link>
        </div>
      </main>
    </>
  )
}

