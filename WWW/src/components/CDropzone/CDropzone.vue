<template>
  <div class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          class="w-8 h-8 mb-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <div v-if="!model" class="text-center">
          <p class="mb-2 text-sm text-gray-500">
            <span class="font-semibold">Kliknij, aby wgrać zdjęcie</span> lub przeciągnij i upuść
          </p>
          <p class="text-xs text-gray-500">JPG, PNG, WEBP</p>
        </div>
        <div v-else class="text-center">
          <p class="mb-2 text-sm text-gray-500">
            <span class="font-semibold">Podegrano plik o nazwie</span>
          </p>
          <p class="mb-2 text-sm text-gray-500">
            {{ model.name }}
          </p>
        </div>
      </div>

      <input
        :model-value="model"
        @change="handleFileChange"
        id="dropzone-file"
        type="file"
        class="hidden"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<File | null>()

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    model.value = files[0]
  } else {
    model.value = undefined
  }
}
</script>
