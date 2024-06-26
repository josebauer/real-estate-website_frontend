import { Container } from "react-bootstrap";
import { RealEstateType } from "@/app/services/realEstateService";
import styles from "./slideSection.module.scss";
import Slide from "../common/slide/Slide";

interface props {
  newestRealEstate: RealEstateType[]
}

export default function SlideNewestSection({ newestRealEstate }: props) {
  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <p className={styles.sectionTitle}>Novidades</p>
        <Slide realEstate={newestRealEstate} />
      </Container>
    </>
  )
}