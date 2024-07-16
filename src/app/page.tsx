import SearchSection from "../components/searchSection/SearchSection";
import realEstateService from "../services/realEstateService";
import SlideSection from "../components/slideSection/SlideSection";

export default async function Home() {
  const newestRealEstate = await realEstateService.getNewestRealEstate()
  const featuredRealEstate = await realEstateService.getFeaturedRealEstate()

  return (
    <>
      <main>
        <SearchSection />
        <SlideSection realEstate={newestRealEstate} title="Novidades" />
        <SlideSection realEstate={featuredRealEstate} title="Imóveis em destaque" />
      </main>
    </>
  )
}

