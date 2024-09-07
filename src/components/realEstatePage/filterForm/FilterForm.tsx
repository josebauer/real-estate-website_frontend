import styles from "./filterForm.module.scss";
import { FormEvent, useEffect, useState } from 'react';
import realEstateService, { FilterValues, RealEstateType } from '@/services/realEstateService';
import categoriesService, { CategoryType } from "@/services/categoriesService";
import { Form, FormSelect } from "react-bootstrap";

interface FilterFormProps {
  filters: FilterValues
  onFilter: (filters: FilterValues, results: RealEstateType[]) => void
}

export default function FilterForm({ filters: initialFilters, onFilter }: FilterFormProps) {
  const [filters, setFilters] = useState<FilterValues>(initialFilters)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await categoriesService.getCategories()
      setCategories(fetchedCategories)
    }

    fetchCategories()

    const fetchCities = async () => {
      const fetchedCities = await realEstateService.getCities()
      setCities(fetchedCities)
    }

    fetchCities()
  }, [])


  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const filteredRealEstate = await realEstateService.getFilteredRealEstate(filters)
    onFilter(filters, filteredRealEstate)

    setFilters({})
  }

  return (
    <Form className={`${styles.filterForm} shadow`} onSubmit={handleSubmit}>
      <FormSelect name="city" value={filters.city || ''} onChange={handleInputChange}>
        <option value="">Cidade</option>
        {cities.map((city) => (
          <option value={city} key={city}>
            {city}
          </option>
        ))}
      </FormSelect>

      <FormSelect name="district" value={filters.district || ''} onChange={handleInputChange}>
        <option value="">Bairro</option>
        <option value="Alto da Tijuca">Alto da Tijuca</option>
        <option value="Efapi">Efapi</option>
        <option value="Centro">Centro</option>
      </FormSelect>

      <FormSelect name="categoryId" value={filters.categoryId || ''} onChange={handleInputChange}>
        <option value="">Categoria</option>
        {Array.isArray(categories) && categories.map((category) => (
          <option
            value={category.id}
            key={category.id}
          >
            {category.name}
          </option>
        ))}
      </FormSelect>

      <FormSelect name="negotiation" value={filters.negotiation || ''} onChange={handleInputChange}>
        <option value="">Finalidade</option>
        <option value="venda">Venda</option>
        <option value="locação">Locação</option>
      </FormSelect>

      <FormSelect name="bedrooms" value={filters.bedrooms || ''} onChange={handleInputChange}>
        <option value="">Dormitórios</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </FormSelect>

      <FormSelect name="garages" value={filters.garages || ''} onChange={handleInputChange}>
        <option value="">Vagas</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </FormSelect>

      <input
        type="number"
        name="id"
        placeholder="# Código do Imóvel"
        onChange={handleInputChange}
        value={filters.id || ''}
      />

      <button className={styles.button} type="submit">Pesquisar</button>
    </Form >
  )
}