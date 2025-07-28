<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="alertClass"
      role="alert"
      class="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center p-4 mb-4 text-sm border rounded-lg z-50"
    >
      <svg
        class="shrink-0 inline w-4 h-4 me-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <div>
        <span class="font-medium">{{ title }}</span> {{ message }}
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAlert } from '@/composables/useAlert'

const { visible, message, type } = useAlert()

const alertClass = computed(() => {
  switch (type.value) {
    case 'success':
      return 'text-green-800 border-green-300 bg-green-50 '
    case 'danger':
      return 'text-red-800 border-red-300 bg-red-50 '
    case 'warning':
      return 'text-yellow-800 border-yellow-300 bg-yellow-50'
    case 'dark':
      return 'text-gray-800 border-gray-300 bg-gray-50'
    default:
      return 'text-blue-800 border-blue-300 bg-blue-50'
  }
})

const title = computed(() => {
  switch (type.value) {
    case 'success':
      return 'Sukces!'
    case 'danger':
      return 'Błąd!'
    case 'warning':
      return 'Uwaga!'
    case 'dark':
      return 'Notice!'
    default:
      return 'Info!'
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
