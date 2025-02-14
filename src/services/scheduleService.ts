import api from "./api"
import { RealEstateType } from "./realEstateService"

export type ScheduleType = {
  id: number
  userId: number
  realEstateId: number
  scheduledDate: Date
  status: "pendente" | "confirmado" | "cancelado"
  realEstate: RealEstateType
}

const scheduleService = {
  getUserSchedules: async() => {
    const token = localStorage.getItem("realEstate-token") || sessionStorage.getItem('realEstate-token')

    const res = await api.get('/schedules', {
      headers: { Authorization: `Bearer ${token}`}
    }).catch((error) => error.response)

    console.log('retorno da API:', res.data.schedules)

    return res.data
  },

  createSchedule: async(realEstateId: number, scheduledDate: Date) => {
    const token = localStorage.getItem('realEstate-token') || sessionStorage.getItem('realEstate-token')

    const res = await api.post('/schedules', {
      realEstateId,
      scheduledDate: scheduledDate.toISOString()
    }, {
      headers: { Authorization: `Bearer ${token}`}
    }).catch((error) => error.response)

    res.data
  },

  updateScheduleStatus: async (scheduleId: number, status: "pendente" | "confirmado" | "cancelado") => {
    const token = localStorage.getItem('realEstate-token') || sessionStorage.getItem('realEstate-token');
    
    const res = await api.patch(`/schedules/${scheduleId}/status`, {
      status,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch((error) => error.response);
    
    return res.data;
  },

  deleteSchedule: async (scheduleId: number) => {
    const token = localStorage.getItem('realEstate-token') || sessionStorage.getItem('realEstate-token');
    
    const res = await api.delete(`/schedules/${scheduleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch((error) => error.response);
    
    return res.data;
  },
};

export default scheduleService;