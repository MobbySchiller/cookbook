<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-1 text-sm font-medium"
      :class="errorMessage ? 'text-red-600' : 'text-dark'"
    >
      {{ label }}
    </label>

    <textarea
      v-model="model"
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      :class="[
        'text-sm rounded-lg block w-full p-2.5 resize-none',
        errorMessage
          ? 'bg-red-50 border border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500',
      ]"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()

withDefaults(
  defineProps<{
    label?: string
    id: string
    placeholder?: string
    rows?: number
    errorMessage?: string
  }>(),
  {
    rows: 6,
    placeholder: '',
  },
)
</script>
