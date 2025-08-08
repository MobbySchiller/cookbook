<template>
  <button
    :class="[
      ' text-sm cursor-pointer px-3 py-1 border border-1 border-primary-500 rounded-full',
      isActive ? 'bg-primary' : '',
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ label: string; isActive: boolean }>()
</script>
