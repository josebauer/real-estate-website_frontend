import Image from "next/image";
import styles from "./slideCard.module.scss";
import { RealEstateType } from "@/app/services/realEstateService";

interface props {
  realEstate: RealEstateType
}

export default function SlideCard({ realEstate }: props) {
  return (
    <>
      <div className={styles.slide}>
        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${realEstate.imagesUrl}`} width={600} height={300} alt={realEstate.title} className={styles.slideImg} />
        <p className={styles.slideTitle}>{realEstate.title}</p>
        <p className={styles.location}>{realEstate.district} - {realEstate.city}/{realEstate.state.toUpperCase()}</p>
        <div>
          <p className={styles.value}></p>
          <p className={styles.negotiation}></p>
        </div>
        <div className="d-flex">
          <Image src={"/cardIcons/bedroomIcon.svg"} width={35} height={33} alt="Ícone de cama" />
          <p>{realEstate.bedrooms} quarto(s) {realEstate.suites === null ? '' : `, sendo ${realEstate.suites} suíte(s)`}</p>
        </div>
        <div className="d-flex">
          <Image src={"/cardIcons/garageIcon.svg"} width={35} height={35} alt="Ícone de garagem" />
          <p>{realEstate.garages} vaga(s) de garagem</p>
        </div>
        <div className="d-flex">
          <Image src={"/cardIcons/areaIcon.svg"} width={35} height={35} alt="Ícone de área do imóvel" />
          <p>{realEstate.buildingArea}m² de área total</p>
        </div>
      </div>
    </>
  )
}