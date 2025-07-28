import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '@/api/Auth'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  const isCurrentFetched = ref<boolean>(false)

  async function fetchCurrent() {
    if (isCurrentFetched.value) return
    try {
      const response = await AuthService.current()
      user.value = response
    } catch (err) {
      console.log(err)
    } finally {
      isCurrentFetched.value = true
    }
  }

  return {
    user,
    fetchCurrent,
  }
})
