import api from '@/boot/axios'
import type { LoginRequest, RegisterRequest } from './AuthTypes'

export const AuthService = {
  register: async (data: RegisterRequest): Promise<void> => {
    const response = await api.post('/register', data)
    return response.data
  },
  verifyEmail: async (token: string): Promise<void> => {
    const response = await api.get('/verify-email', { params: { token } })
    return response.data
  },
  login: async (data: LoginRequest): Promise<void> => {
    const response = await api.post('/login', data)
    return response.data
  },
  logout: async (): Promise<void> => {
    const response = await api.post('/logout')
    return response.data
  },
  current: async (): Promise<void> => {
    const response = await api.post('/current')
    return response.data
  },
}
