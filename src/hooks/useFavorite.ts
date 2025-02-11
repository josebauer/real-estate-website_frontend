import { useAuth } from "@/contexts/AuthContext";
import realEstateService from "@/services/realEstateService";
import { useEffect, useState } from "react";

export function useFavorite(initialState: boolean, realEstateId: number, isAuthenticated: boolean, onRemoveFavorite?: (id: number) => void) {
  const { favorites, fetchFavorites } = useAuth();
  const [isFavorited, setIsFavorited] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsFavorited(favorites.includes(realEstateId));
  }, [favorites, realEstateId]);
  
  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await realEstateService.removeFav(realEstateId);
      } else {
        await realEstateService.addToFav(realEstateId);
      }
      await fetchFavorites(); // Atualiza os favoritos globais
    } catch (err) {
      console.error("Erro ao processar favorito:", err);
    }
  };

  return { isFavorited, toggleFavorite, error };
}