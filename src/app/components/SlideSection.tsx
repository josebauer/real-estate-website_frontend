import { Container } from "react-bootstrap";
import { RealEstateType } from "../services/realEstateService";
import styles from "./slideSection.module.scss";
import Slide from "./common/slide/Slide";

interface props {
  newestRealEstate: RealEstateType[]
}

export default function SlideSection({ newestRealEstate }: props) {
  return (
    <>
      <Container>
        <p className={styles.sectionTitle}>Novidades!</p>
        <Slide realEstate={newestRealEstate} />
      </Container>
    </>
  )
}