import { Container } from "react-bootstrap";
import { RealEstateType } from "@/services/realEstateService";
import styles from "./slideSection.module.scss";
import Slide from "../common/slide/Slide";

interface props {
  realEstate: RealEstateType[],
  title: string
}

export default function SlideSection({ realEstate, title }: props) {
  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <p className={styles.sectionTitle}>{title}</p>
        <Slide realEstate={realEstate} />
      </Container>
    </>
  )
}