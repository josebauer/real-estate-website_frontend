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
        <Image src={`${process.env.NEXT_PUBLIC_BASEURL}/${realEstate.imagesUrl}`} alt={realEstate.title} className={styles.slideImg} />
        <p className={styles.slideTitle}>{realEstate.title}</p>
        <p className={styles.location}>{realEstate.district} - {realEstate.city}/{realEstate.state}</p>
        <div>
          <p className={styles.value}></p>
          <p className={styles.negotiation}></p>
        </div>
        <div>
          <Image src={"/cardIcons/bedroomIcon.svg"} alt="Ícone de cama" />
          <p>{realEstate.bedrooms} quartos {realEstate.suites === null ? '' : `, sendo ${realEstate.suites} suítes`}</p>
        </div>
        <div>
          <Image src={"/cardIcons/garageIcon.svg"} width={35} height={35} alt="Ícone de garagem" />
          <p>{realEstate.garages} vagas de garagem</p>
        </div>
        <div>
          <Image src={"/cardIcons/areaIcon.svg"} width={35} height={35} alt="Ícone de área do imóvel" />
          <p>{realEstate.buildingArea} de área total</p>
        </div>
      </div>
    </>
  )
}