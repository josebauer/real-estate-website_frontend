import styles from "../app/page.module.scss"
import SearchSection from "./components/SearchSection";
import SlideSection from "./components/SlideSection";
import realEstateService from "./services/realEstateService";


export default async function Home() {
  const newestRealEstate = await realEstateService.getNewestRealEstate()
  return (
    <>
      <main>
        <SearchSection />
        <SlideSection newestRealEstate={ newestRealEstate } />
      </main>
    </>
  )
}

