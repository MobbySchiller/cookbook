import api from '@/boot/axios'
import type { RegisterRequest } from './AuthTypes'

export const AuthService = {
  register: async (data: RegisterRequest): Promise<void> => {
    const response = await api.post('/register', data)
    return response.data
  },
}
