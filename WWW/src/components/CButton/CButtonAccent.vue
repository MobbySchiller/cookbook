<template>
  <button
    type="button"
    :disabled="loading || disabled"
    :class="[
      'border-accent-500 bg-accent-400 border-1 text-white cursor-pointer rounded-full border-1 px-5 py-2.5 text-center text-sm font-semibold focus:outline-none transition-all duration-200',
      loading || disabled ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-500',
    ]"
  >
    <div class="flex items-center justify-center gap-2">
      <div
        v-if="loading"
        class="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"
      ></div>

      <span :class="{ 'opacity-0': loading && hideTextWhileLoading }">
        <slot></slot>
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean
  hideTextWhileLoading?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  hideTextWhileLoading: false,
  disabled: false,
})
</script>
