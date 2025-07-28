<template>
  <div class="flex flex-col items-center px-2 w-full max-w-[400px]">
    <div class="mb-3">Książka Kucharska</div>
    <div
      class="flex flex-col justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-xs w-full"
    >
      <h1 class="text-center font-serif font-semibold mb-4">Zaloguj się</h1>
      <form @submit.prevent="onSubmit" class="flex flex-col">
        <CInput
          v-model="email"
          ref="emailRef"
          class="mb-3"
          label="Email"
          id="email"
          type="email"
          :rules="[required, validEmail]"
        />
        <CInputPassword
          v-model="password"
          ref="passwordRef"
          class="mb-5"
          label="Hasło"
          id="password"
          :rules="[required]"
        />
        <CButtonPrimary color="primary" type="submit">Zaloguj</CButtonPrimary>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useValidation } from '@/composables/useValidation'
import CInputPassword from '@/components/CInput/CInputPassword.vue'
import { AuthService } from '@/api/Auth'
import { useAlert } from '@/composables/useAlert'

const alert = useAlert()
const { required, validEmail, sameAs } = useValidation()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const emailRef = ref()
const passwordRef = ref()

const loading = ref<boolean>(false)

async function onSubmit() {
  try {
    loading.value = true
    const isEmailValid = emailRef.value?.validate()
    const isPasswordValid = passwordRef.value?.validate()

    const isFormValid = isEmailValid && isPasswordValid

    if (!isFormValid) {
      alert.show('danger', 'Niepoprawnie uzupełnione dane')
      return
    }

    const request = {
      email: email.value,
      password: password.value,
    }
    await AuthService.login(request)
    router.push({ name: 'Home' })
  } catch (err) {
    alert.show('danger', err.response.data.message)
  } finally {
    loading.value = false
  }
}
</script>
