import api from "./api";

interface RegisterParams {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
}

interface LoginParams {
  email: string
  password: string
}

const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post('/auth/register', params).catch(error => {
      if (error.response.status === 400) {
        return error.response
      }

      return error
    })

    return res
  },

  login: async (params: LoginParams) => {
    const res = await api.post('/auth/login', params).catch(error => {
      if (error.response.status === 400 || error.response.status === 401) {
        return error.response
      }

      return error
    })

    if (res.status === 200) {
      sessionStorage.setItem("realEstate-token", res.data.token)
    }

    return res
  },

  forgotPassword: async(email: string) => {
    const res = await api.post('auth/forgot-password', { email }).catch(error => {
      if (error.response.status === 404) {
        return error.response
      }

      return error
    })

    return res
  },

  verifyCode: async(email: string, code: string) => {
    const res = await api.post('/auth/verify-reset-code', { email, code }).catch(error => {
      if (error.response.status === 400) {
        return error.response
      }

      return error
    })

    return res
  },

  resetPassword: async(email: string, code: string, newPassword: string) => {
    const res = await api.post('/auth/reset-password', { email, code, newPassword }).catch(error => {
      if (error.response.status === 400) {
        return error.response
      }

      return error
    })

    return res
  }
}

export default authService