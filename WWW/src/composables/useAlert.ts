import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('info')

export function useAlert() {
  function show(
    newType: 'success' | 'danger' | 'warning' | 'dark' | 'info',
    newMessage: string,
    duration = 3000,
  ) {
    type.value = newType
    message.value = newMessage
    visible.value = true

    if (duration > 0) {
      setTimeout(() => {
        visible.value = false
      }, duration)
    }
  }

  function hide() {
    visible.value = false
  }

  return {
    visible,
    message,
    type,
    show,
    hide,
  }
}
