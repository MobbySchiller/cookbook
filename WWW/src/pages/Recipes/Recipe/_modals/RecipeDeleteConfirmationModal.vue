<template>
  <div
    v-if="showDeleteModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="bg-white rounded-lg shadow p-6 w-full max-w-md text-center">
      <h3 class="mb-4 text-lg font-medium text-gray-900">
        Czy na pewno chcesz usunąć ten przepis?
      </h3>
      <div class="flex justify-center gap-4">
        <button
          @click="confirmDelete"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
        >
          Usuń
        </button>
        <button
          @click="showDeleteModal = false"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
        >
          Anuluj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAlert } from '@/composables/useAlert'
import { RecipesService } from '@/api/Recipes'

const alert = useAlert()
const router = useRouter()

const showDeleteModal = defineModel<boolean>()

const props = defineProps<{ id: number }>()

async function confirmDelete() {
  try {
    await RecipesService.delete(props.id)
    alert.show('success', 'Pomyślnie usunięto przepis')
    router.push({ name: 'Home' })
  } catch (err) {
    alert.show('danger', err.response?.data?.message || 'Błąd podczas usuwania przepisu')
  }
}
</script>
