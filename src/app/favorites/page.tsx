"use client"

import SlideCard from "@/components/common/slideCard/SlideCard"
import styles from "./page.module.scss"
import realEstateService, { RealEstateType } from "@/services/realEstateService"
import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"

export default function Favorites() {
  const [data, setData] = useState<{ realEstate: RealEstateType[] }>({ realEstate: [] })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setError(null)

        const response = await realEstateService.getFav()
        setData({ realEstate: response.realEstate || [] })
      } catch (err: any) {
        setError(err.message || "Erro ao buscar imóveis favoritos.")
      }
    };

    fetchFavorites()
  }, [])

  const handleRemoveFavorite = (id: number) => {
    setData((prevState) => ({
      realEstate: prevState.realEstate.filter((realEstate) => realEstate.id !== id),
    }));
  };


  if (error) {
    return (
      <main>
        <Container>
          <p className={styles.favoritersNotFound}>Erro: {error}</p>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <p className={styles.title}>Meus Favoritos</p>
        <div className={styles.realEstate}>
          {data.realEstate.length > 0 ? (
            data.realEstate.map((realEstate) => (
              <SlideCard key={realEstate.id} realEstate={realEstate} onRemoveFavorite={handleRemoveFavorite} />
            ))
          ) : (
            <p className={styles.favoritesNotFound}>Nenhum imóvel foi adicionado aos favoritos.</p>
          )}
        </div>
      </Container>
    </main>
  );
}