import { Container } from "react-bootstrap";
import { RealEstateType } from "@/app/services/realEstateService";
import styles from "./slideSection.module.scss";
import Slide from "../common/slide/Slide";

interface props {
  featuredRealEstate: RealEstateType[]
}

export default function SlideFeaturedSection({ featuredRealEstate }: props) {
  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <p className={styles.sectionTitle}>Imóveis em destaque</p>
        <Slide realEstate={featuredRealEstate} />
      </Container>
    </>
  )
}