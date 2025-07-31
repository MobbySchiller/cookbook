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
    <select
      v-model="model"
      :id="id"
      :placeholder="placeholder"
      :type="type"
      :class="[
        'text-sm rounded-lg block w-full p-2.5',
        errorMessage
          ? 'bg-red-50 border border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500',
      ]"
      @blur="validate"
    >
      <option v-for="option in props.options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <Transition name="slide-fade">
      <p v-if="errorMessage" class="mt-1 text-xs text-red-600">{{ errorMessage }}</p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { CookbookDictionaryItem } from '@/api/Cookbook/CookbookTypes'
import { ref } from 'vue'

const model = defineModel<number>({ required: true })

const props = withDefaults(
  defineProps<{
    id: string
    options: CookbookDictionaryItem[]
    label?: string
    type?: string
    placeholder?: string
    rules?: ((val: string) => true | string)[]
  }>(),
  {
    type: 'text',
  },
)

const errorMessage = ref<string | null>(null)

function validate() {
  errorMessage.value = null

  if (!props.rules || props.rules.length === 0) return true

  for (const rule of props.rules) {
    const result = rule(model.value)
    if (result !== true) {
      errorMessage.value = result
      return false
    }
  }

  return true
}

defineExpose({ validate })
</script>
