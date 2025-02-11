"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import realEstateService from "@/services/realEstateService";

interface AuthContextType {
  isAuthenticated: boolean;
  favorites: number[];
  fetchFavorites: () => Promise<void>;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("realEstate-token") || sessionStorage.getItem("realEstate-token");
    setIsAuthenticated(token !== null);

    if (token) {
      fetchFavorites();
    }
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await realEstateService.getFav();
      setFavorites(response.realEstate.map((item: any) => item.id));
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
    fetchFavorites(); // Atualiza favoritos ao logar
  };

  const logout = () => {
    localStorage.removeItem("realEstate-token");
    sessionStorage.removeItem("realEstate-token");
    setIsAuthenticated(false);
    setFavorites([]); // Limpa favoritos ao deslogar
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, favorites, fetchFavorites, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};