import Image from "next/image";
import styles from "./slideCard.module.scss";
import { RealEstateType } from "@/app/services/realEstateService";

interface props {
  realEstate: RealEstateType
}

export default function SlideCard({ realEstate }: props) {
  return (
    <>
      <div className={`${styles.slide} shadow-sm`}>
        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${realEstate.imagesUrl?.[0]}`} alt={realEstate.title} className={styles.slideImg} />
        <p className={styles.slideTitle}>{realEstate.title}</p>
        <p className={styles.location}>
          {realEstate.district} - {realEstate.city}/{realEstate.state.toUpperCase()}
        </p>
        <div className="d-flex px-4 py-3 align-items-center justify-content-between">
          <p className={styles.price}>
            {realEstate.price === null ? 'R$ A CONSULTAR' : `${realEstate.price}`}
          </p>
          <p className={styles.negotiation}>
            {realEstate.negotiation.toUpperCase()}
          </p>
        </div>
        <div className="d-flex px-4 py-1 align-items-center gap-3">
          <Image src={"/cardIcons/bedroomIcon.svg"} width={35} height={33} alt="Ícone de cama" />
          <p>
            {realEstate.bedrooms === null ? '0' : realEstate.bedrooms} quarto(s)
            {realEstate.suites === null ? '' : `, sendo ${realEstate.suites} suíte(s)`}
          </p>
        </div>
        <div className="d-flex px-4 py-1 align-items-center gap-3">
          <Image src={"/cardIcons/garageIcon.svg"} width={35} height={35} alt="Ícone de garagem" />
          <p>
            {realEstate.garages === null ? '0' : realEstate.garages} vaga(s) de garagem
          </p>
        </div>
        <div className="d-flex px-4 pt-1 pb-4 align-items-center gap-3">
          <Image src={"/cardIcons/areaIcon.svg"} width={35} height={35} alt="Ícone de área do imóvel" />
          <p>
            {realEstate.buildingArea === null ? `${realEstate.totalArea} de área total` :
              `${realEstate.buildingArea} de área construída`}
          </p>
        </div>
      </div>
    </>
  )
}