import api from "./api";

export type RealEstateType = {
  id: number
  title: string
  price: number
  negotiation: string
  description: string
  zipCode: number
  address: string
  district: string
  city: string
  state: string
  buildingArea: number
  totalArea: number
  bedrooms: number
  suites: number
  garages: number
  imagesUrl: Array<String>
  featured: boolean
}

export type FilterValues = {
  city?: string
  district?: string
  categoryId?: string
  negotiation?: string
  bedrooms?: number
  garages?: number
  id?: number
  page?: number
  perPage?: number
}

export interface FilterParams extends Partial<FilterValues> { }

const realEstateService = {
  getNewestRealEstate: async () => {
    const res = await api.get('/real-estate/newest').catch((error) => {
      console.log(error.response.data.message)

      return error.response
    })

    return res.data
  },

  getFeaturedRealEstate: async () => {
    const res = await api.get('/real-estate/featured').catch((error) => {
      console.log(error.response.data.message)

      return error.response
    })

    return res.data
  },

  getFilteredRealEstate: async (params: FilterParams) => {
    const res = await api.get('/real-estate/filter', { params }).catch((error) => {
      console.log(error.response.data.message)
      
      return error.response
    })
    
    return res.data.realEstate
  },
  
  getRealEstateById: async (id: number | string) => {
    const res = await api.get(`/real-estate/${id}`).catch((error) => {
      return error.response
    })
  
    return res
  },
}

export default realEstateService