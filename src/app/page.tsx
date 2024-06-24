import styles from "../app/page.module.scss"
import SearchSection from "./components/SearchSection";
import SlideSection from "./components/SlideSection";
import realEstateService, { RealEstateType } from "./services/realEstateService";
import { ReactNode } from "react";

interface HomePageProps {
  children?: ReactNode
  realEstate: RealEstateType[]
}

export default async function Home() {
  const response = await realEstateService.getNewestRealEstate()

  // console.log({response})

  return (
    <>
      <main>
        <SearchSection />
        <SlideSection newestRealEstate={ response } />
      </main>
    </>
  )
}

