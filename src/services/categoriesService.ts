import api from "./api";
import { RealEstateType } from "./realEstateService";

export type CategoryType = {
  id: number
  name: string
  position: number
  realEstate?: RealEstateType
}

const categoriesService = {
  getCategories: async () => {
    const res = await api.get("/categories").catch((error) => {
      return error.response
    })

    return res.data.categories
  },

  getRealEstate: async (id: number) => {
    const res = await api.get(`/categories/${id}`).catch((error) => {
      return error.response
    })

    return res
  }
}

export default categoriesService