'use client'

import styles from "./page.module.scss"
import SlideCard from "@/components/common/slideCard/SlideCard";
import FilterForm from "@/components/realEstatePage/filterForm/FilterForm";
import realEstateService, { FilterValues, RealEstateType } from "@/services/realEstateService";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

export default function RealEstate() {
  const [filteredRealEstate, setFilteredRealEstate] = useState<RealEstateType[]>([])
  const [filters, setFilters] = useState<FilterValues>({})
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFilters = localStorage.getItem('realEstateFilters')
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters)
        setFilters(parsedFilters)
        fetchRealEstate(parsedFilters)
      } else {
        fetchRealEstate()
      }
    }
  }, [])

  const fetchRealEstate = async (appliedFilters: FilterValues = { perPage: 12 }) => {
    try {
      const results = await realEstateService.getFilteredRealEstate(appliedFilters)
      setFilteredRealEstate(results)
  
      if (typeof window !== "undefined") {
        localStorage.setItem('realEstateResults', JSON.stringify(results))
      }
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error)
    }
  }

  const handleFilter = (newFilters: FilterValues, results?: RealEstateType[]) => {
    setFilters(newFilters)
    if (results) {
      setFilteredRealEstate(results)
    } else {
      fetchRealEstate(newFilters)
    }
  };

  const clearFilters = () => {
    setFilters({ perPage: 12 })
    fetchRealEstate({ perPage: 12 })
    localStorage.removeItem('realEstateFilters')
  }

  return (
    <>
      <main>
        <Container className="d-flex flex-column align-items-start py-5 gap-3">
          <FilterForm filters={filters} onFilter={handleFilter} />
          <Button className={styles.clearFiltersBtn} onClick={clearFilters}>Limpar Filtros</Button>
          <div className={styles.filteredRealEstateList}>
            {filteredRealEstate?.length > 0 ? (
              filteredRealEstate.map(realEstate => (
                <SlideCard key={realEstate.id} realEstate={realEstate} />
              ))
            ) : (
              <p className={styles.realEstateNotFound}>Nenhum imóvel encontrado. Altere sua pesquisa!</p>
            )}
          </div>

        </Container>
      </main>
    </>
  )
}