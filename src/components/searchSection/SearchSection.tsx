'use client'

import { Container } from "react-bootstrap";
import styles from "./searchSection.module.scss";
import FilterForm from "../realEstatePage/filterForm/FilterForm";
import { useState } from "react";
import { FilterValues } from "@/services/realEstateService";
import { useRouter } from "next/navigation";

export default function SearchSection() {
  const [filters, setFilters] = useState<FilterValues>({})
  
  const router = useRouter()

  const handleFilter = (newFilters: FilterValues) => {
    setFilters(newFilters)

    localStorage.setItem('realEstateFilters', JSON.stringify(newFilters))

    router.push('/real-estate')
  }

  return (
    <>
      <section className={styles.searchSection}>
        <Container className={styles.search}>
          <FilterForm filters={filters} onFilter={handleFilter}/>
        </Container>
      </section>
    </>
  )
}