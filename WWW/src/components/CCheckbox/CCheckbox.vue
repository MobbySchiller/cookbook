<template>
  <div class="flex">
    <input
      v-model="model"
      id="default-checkbox"
      type="checkbox"
      class="w-5 h-5 text-accent bg-accent border-accent rounded-sm"
    />
    <label for="default-checkbox" class="ms-2 text-sm"><slot></slot></label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>()
</script>
