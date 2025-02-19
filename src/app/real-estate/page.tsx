'use client'

import styles from "./page.module.scss"
import SlideCard from "@/components/common/slideCard/SlideCard";
import FilterForm from "@/components/realEstatePage/filterForm/FilterForm";
import PaginationComponent from "@/components/realEstatePage/pagination/PaginationComponent";
import realEstateService, { FilterValues, RealEstateType } from "@/services/realEstateService";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

export default function RealEstate() {
  const [filteredRealEstate, setFilteredRealEstate] = useState<RealEstateType[]>([])
  const [filters, setFilters] = useState<FilterValues>({})
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFilters = localStorage.getItem('realEstateFilters')
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters)
        setFilters(parsedFilters)
        fetchRealEstate(parsedFilters, 1)
      } else {
        fetchRealEstate({}, 1)
      }
    }
  }, [])

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
      fetchRealEstate(filters, newPage);
    }
  }

  const fetchRealEstate = async (appliedFilters: FilterValues = {}, newPage: number = 1) => {
    try {
      const finalFilters = { ...appliedFilters, perPage: appliedFilters.perPage || 12, page: newPage };

      const results = await realEstateService.getFilteredRealEstate(finalFilters);
      setFilteredRealEstate(results.realEstate);

      if (typeof window !== "undefined") {
        localStorage.setItem('realEstateResults', JSON.stringify(results));
      }

      const calculatedTotalPages = Math.ceil(results.total / finalFilters.perPage);
      setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
      setFilteredRealEstate([]);
      setTotalPages(1);
    }
  }

  const handleFilter = (newFilters: FilterValues, results?: RealEstateType[]) => {
    setFilters(newFilters);
    setPage(1);

    if (results) {
      setFilteredRealEstate(results);
      setTotalPages(Math.ceil(results.length / (newFilters.perPage || 12)));
    } else {
      fetchRealEstate(newFilters, 1);
    }
  };

  const clearFilters = () => {
    setPage(1)
    setFilters({})
    fetchRealEstate({}, 1);
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
          <div className="align-self-center">
            <PaginationComponent
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Container>

      </main>
    </>
  )
}