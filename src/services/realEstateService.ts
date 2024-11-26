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
  featured: boolean,
  favorited: boolean
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
      return error.response
    })

    return res.data
  },

  getFeaturedRealEstate: async () => {
    const res = await api.get('/real-estate/featured').catch((error) => {
      return error.response
    })

    return res.data
  },

  getFilteredRealEstate: async (params: FilterParams) => {
    const res = await api.get('/real-estate/filter', { params }).catch((error) => {
      return error.response
    })

    return res.data.realEstate
  },

  getCities: async () => {
    const res = await api.get('/real-estate/cities').catch((error) => {
      return error.response
    })

    return res.data
  },

  getDistricts: async (city: string) => {
    const res = await api.get('real-estate/districts', {
      params: { city }
    }).catch((error) => {
      return error.response
    })

    return res.data
  },

  getRealEstateById: async (id: number | string) => {
    const res = await api.get(`/real-estate/${id}`).catch((error) => {
      return error.response
    })

    return res
  },

  addToFav: async (realEstateId: number | string) => {
    const token = localStorage.getItem('realEstate-token') || sessionStorage.getItem('realEstate-token')

    const res = await api.post("/favorites", { realEstateId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((error) => {
      return error.response
    })

    return res
  },

  removeFav: async (realEstateId: number | string) => {
    const token = localStorage.getItem('realEstate-token') || sessionStorage.getItem('realEstate-token')

    const res = await api.delete(`/favorites/${realEstateId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((error) => {
      return error.response
    })

    return res
  },

  getFav: async () => {
    const token = localStorage.getItem('realEstate-token') || sessionStorage.getItem('realEstate-token')

    const res = await api.get("/favorites", {
      headers: { Authorization: `Bearer ${token}` }
    }).catch((error) => {
      return error.response
    })

    return res.data
  },

  getFavStatus: async (realEstateId: number | string) => {
    const token = localStorage.getItem('realEstate-token') || sessionStorage.getItem('realEstate-token');
  
    const res = await api.get(`/favorites/status/${realEstateId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch((error) => {
      return error.response;
    });
  
    return res.data.favorited;
  },
}

export default realEstateService