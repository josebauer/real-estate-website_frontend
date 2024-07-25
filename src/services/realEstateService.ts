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

export interface NegotiationParams {
  negotiation: string
  realEstate?: RealEstateType
}

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

  getRealEstateByNegotiation: async (params: NegotiationParams) => {
    const res = await api.get('/real-estate/filter', { params }).catch((error) => {
      console.log(error.response.data.message)

      return error.respons
    })

    return res.data.realEstate
  }
}

export default realEstateService