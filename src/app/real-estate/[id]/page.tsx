"use client"

import styles from "./page.module.scss";
import realEstateService, { RealEstateType } from "@/services/realEstateService";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Image from "next/image";
import SlideThumbnail from "@/components/common/slideThumbnail/SlideThumbnail";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorite } from "@/hooks/useFavorite";
import { useModal } from "@/hooks/useModal";
import LoginRegisterModal from "@/components/common/loginRegisterModal/LoginRegisterModal";
import ScheduleModal from "@/components/common/scheduleModal/ScheduleModal";

export default function RealEstate({ params }: { params: { id: string } }) {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [realEstate, setRealEstate] = useState<RealEstateType | null>(null);
  const { id } = params;
  const { isAuthenticated } = useAuth();
  const {
    showModal,
    initialMode,
    handleShowModal,
    handleCloseModal,
  } = useModal();

  const { isFavorited, toggleFavorite, error } = useFavorite(
    realEstate?.favorited || false,
    parseInt(id, 10),
    isAuthenticated
  );

  const getRealEstate = async () => {
    if (!id) return;

    const res = await realEstateService.getRealEstateById(id);

    if (res.status === 200) {
      setRealEstate(res.data);
    }
  };

  useEffect(() => {
    getRealEstate();
  }, [id]);

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      handleShowModal("login");
      return;
    }

    await toggleFavorite();
  }

  const handleShare = async () => {
    if (!realEstate) return;

    const url = `${window.location.origin}/real-estate/${id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: realEstate.title,
          text: "Confira este imóvel incrível!",
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copiado para a área de transferência!");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  const handleOpenScheduleModal = () => {
    if (!isAuthenticated) {
      handleShowModal("login")
      return
    }

    setScheduleModalOpen(true)
  }

  const handleCloseScheduleModal = () => {
    setScheduleModalOpen(false)
  }


  return (
    <>
      <Container className={styles.container}>
        <p className={styles.pageTitle}>Detalhes do imóvel</p>
        <div className={`${styles.realEstateCard} shadow`}>
          {realEstate?.imagesUrl && realEstate.imagesUrl.length > 0 && realEstate?.title ? (
            <SlideThumbnail imagesUrl={realEstate.imagesUrl} title={realEstate.title} />
          ) : (
            <div className={styles.imageNotFound}>
              <p>
                NÃO HÁ IMAGENS
                <br />
                DISPONÍVEIS DESSE IMÓVEL.
              </p>
            </div>
          )}
          <div className={styles.realEstateInfos}>
            <div>
              <p className={styles.cardTitle}>{realEstate?.title} #{realEstate?.id}</p>
              <p className={styles.location}>{realEstate?.district} - {realEstate?.city}/{realEstate?.state.toUpperCase()}</p>
              <div className="mt-4 mt-xl-5 d-flex align-items-center justify-content-between gap-xl-5">
                <p className={styles.price}>
                  {!realEstate?.price ? 'R$ A CONSULTAR' : `${realEstate?.price}`}
                </p>
                <p className={styles.negotiation}>{realEstate?.negotiation}</p>
              </div>
              <p className={styles.condominium}>
                {realEstate?.condominium ? `Condomínio: +${realEstate?.condominium}` : ''}
              </p>
              <div className="my-4 my-xl-5 d-flex flex-column gap-2">
                <div className="d-flex py-1 align-items-center gap-3">
                  <Image src={"/icons/cardIcons/bedroomIcon.svg"} width={35} height={33} alt="Ícone de cama" />
                  <p className="text-dark m-0">
                    {!realEstate?.bedrooms ? '0' : realEstate?.bedrooms} quarto(s)
                    {!realEstate?.suites ? '' : `, sendo ${realEstate?.suites} suíte(s)`}
                  </p>
                </div>
                <div className="d-flex py-1 align-items-center gap-3">
                  <Image src={"/icons/cardIcons/garageIcon.svg"} width={35} height={35} alt="Ícone de garagem" />
                  <p className="text-dark m-0">
                    {!realEstate?.garages ? '0' : realEstate?.garages} vaga(s) de garagem
                  </p>
                </div>
                <div className="d-flex py-1 align-items-center gap-3">
                  <Image src={"/icons/cardIcons/areaIcon.svg"} width={35} height={35} alt="Ícone de área do imóvel" />
                  <p className="text-dark m-0">
                    {!realEstate?.buildingArea ? `${realEstate?.totalArea} de área total` :
                      `${realEstate?.buildingArea} de área construída`}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <Button className={styles.button} onClick={handleOpenScheduleModal}>Agendar visita</Button>
              <Image src={
                isFavorited
                  ? "/icons/cardIcons/starFavorited.svg"
                  : "/icons/cardIcons/star.svg"
              }
                width={34}
                height={34}
                alt="Favorito"
                className={styles.star}
                onClick={handleToggleFavorite}
              />
              <Image
                className={styles.share}
                src="/icons/cardIcons/share.svg"
                width={34}
                height={34}
                alt="Ícone para compartilhar"
                onClick={handleShare}
              />
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-5">
        <div className={`${styles.cardDesc} shadow d-lg-flex`}>
          <div className={styles.descBox}>
            <p className={styles.descTitle}>Descrição do imóvel:</p>
            <p className={styles.description}>{realEstate?.description}</p>
          </div>
          <div className={styles.address}>
            <p className={styles.addressTitle}>Localização do imóvel:</p>
            <p>{realEstate?.address}, {realEstate?.district}</p>
            <p>CEP - {realEstate?.zipCode} | {realEstate?.city}/{realEstate?.state.toLocaleUpperCase()}</p>
          </div>
        </div>
      </Container>
      <LoginRegisterModal show={showModal} handleClose={handleCloseModal} initialMode={initialMode} />
      <ScheduleModal show={scheduleModalOpen} handleClose={handleCloseScheduleModal} realEstateId={+id} />
    </>
  )
}