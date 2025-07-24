import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '@/api/Auth'

export const useUserStore = defineStore('user', () => {
  const user = ref()

  async function fetchCurrent() {
    if (user.value) return
    try {
      const response = await AuthService.current()
      user.value = response
    } catch (err) {
      console.log(err)
    }
  }

  return {
    user,
    fetchCurrent,
  }
})
