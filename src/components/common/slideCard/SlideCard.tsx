import Image from "next/image";
import styles from "./slideCard.module.scss";
import { RealEstateType } from "@/services/realEstateService";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/hooks/useModal";
import LoginRegisterModal from "../loginRegisterModal/LoginRegisterModal";
import { useFavorite } from "@/hooks/useFavorite";

interface Props {
  realEstate: RealEstateType;
  onRemoveFavorite?: (id: number) => void;
}

export default function SlideCard({ realEstate, onRemoveFavorite }: Props) {
  const { isAuthenticated } = useAuth();
  const {
    showModal,
    initialMode,
    handleShowModal,
    handleCloseModal,
  } = useModal();

  const { isFavorited, toggleFavorite, error } = useFavorite(
    realEstate.favorited,
    realEstate.id,
    isAuthenticated
  );

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      handleShowModal("login");
      return;
    }
  
    const wasFavorited = isFavorited;
    await toggleFavorite();
  
    if (wasFavorited && onRemoveFavorite) {
      onRemoveFavorite(realEstate.id);
    }
  };

  return (
    <>
      <Link href={`/real-estate/${realEstate.id}`} className="text-decoration-none">
        <div className={`${styles.slide} shadow-sm`}>
          <div className={styles.test}>
            <img
              src={`${process.env.NEXT_PUBLIC_BASEURL}/${realEstate.imagesUrl?.[0]}`}
              alt={realEstate.title}
              className={styles.slideImg}
            />
            <p className={styles.id}># {realEstate.id}</p>
            <div className={`${styles.favorite} shadow`}>
              <Image
                src={
                  isFavorited
                    ? "/icons/cardIcons/starFavorited.svg"
                    : "/icons/cardIcons/star.svg"
                }
                width={25}
                height={25}
                alt="Favorito"
                className={styles.star}
                onClick={handleToggleFavorite}
              />
            </div>
          </div>
          <p className={styles.slideTitle}>{realEstate.title}</p>
          <p className={styles.location}>
            {realEstate.district} - {realEstate.city}/{realEstate.state.toUpperCase()}
          </p>
          <div className="d-flex px-4 py-3 align-items-center justify-content-between">
            <p className={styles.price}>
              {!realEstate.price ? "R$ A CONSULTAR" : `${realEstate.price}`}
            </p>
            <p className={styles.negotiation}>{realEstate.negotiation.toUpperCase()}</p>
          </div>
          <div className="d-flex px-4 py-1 align-items-center gap-3">
            <Image
              src={"/icons/cardIcons/bedroomIcon.svg"}
              width={35}
              height={33}
              alt="Ícone de cama"
            />
            <p>
              {!realEstate.bedrooms ? "0" : realEstate.bedrooms} quarto(s)
              {!realEstate.suites ? "" : `, sendo ${realEstate.suites} suíte(s)`}
            </p>
          </div>
          <div className="d-flex px-4 py-1 align-items-center gap-3">
            <Image
              src={"/icons/cardIcons/garageIcon.svg"}
              width={35}
              height={35}
              alt="Ícone de garagem"
            />
            <p>
              {!realEstate.garages ? "0" : realEstate.garages} vaga(s) de garagem
            </p>
          </div>
          <div className="d-flex px-4 pt-1 pb-4 align-items-center gap-3">
            <Image
              src={"/icons/cardIcons/areaIcon.svg"}
              width={35}
              height={35}
              alt="Ícone de área do imóvel"
            />
            <p>
              {!realEstate.buildingArea
                ? `${realEstate.totalArea} de área total`
                : `${realEstate.buildingArea} de área construída`}
            </p>
          </div>
        </div>
      </Link>
      <LoginRegisterModal show={showModal} handleClose={handleCloseModal} initialMode={initialMode} />
    </>
  );
}