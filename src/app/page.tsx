import styles from "../app/page.module.scss"
import SearchSection from "./components/searchSection/SearchSection";
import SlideFeaturedSection from "./components/slideSection/SlideFeaturedSection";
import SlideNewestSection from "./components/slideSection/SlideNewestSection";
import realEstateService from "./services/realEstateService";


export default async function Home() {
  const newestRealEstate = await realEstateService.getNewestRealEstate()
  const featuredRealEstate = await realEstateService.getFeaturedRealEstate()

  return (
    <>
      <main>
        <SearchSection />
        <SlideNewestSection newestRealEstate={newestRealEstate} />
        <SlideFeaturedSection featuredRealEstate={featuredRealEstate} />
      </main>
    </>
  )
}

