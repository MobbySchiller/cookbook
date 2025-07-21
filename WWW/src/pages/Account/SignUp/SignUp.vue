<template>
  <div class="flex flex-col items-center px-2 w-full max-w-[400px]">
    <div class="mb-3 text-xl">Książka Kucharska</div>
    <CCard class="w-full">
      <h1 class="text-center font-serif font-semibold mb-4 text-xl">Zarejestruj się</h1>
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
        <CInput
          v-model="username"
          ref="usernameRef"
          class="mb-3"
          label="Nazwa użytkownika"
          id="username"
          :rules="[required]"
        />
        <CInputPassword
          v-model="password"
          ref="passwordRef"
          class="mb-5"
          label="Hasło"
          id="password"
          :rules="[required, sameAs(passwordRepeat)]"
        />
        <CInputPassword
          v-model="passwordRepeat"
          ref="passwordRepeatRef"
          class="mb-5"
          label="Powtórz hasło"
          id="passwordRepeat"
          :rules="[required, sameAs(password)]"
        />
        <CButtonPrimary class="mt-3" color="primary" type="submit" :loading
          >Zarejestruj się</CButtonPrimary
        >
      </form>
    </CCard>
  </div>
</template>

<script setup lang="ts">
import CInputPassword from '@/components/CInput/CInputPassword.vue'

import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation'

import { AuthService } from '@/api/Auth'

const { required, validEmail, sameAs } = useValidation()

const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')

const emailRef = ref()
const usernameRef = ref()
const passwordRef = ref()
const passwordRepeatRef = ref()

const loading = ref<boolean>(false)

async function onSubmit() {
  try {
    loading.value = true
    const isEmailValid = emailRef.value?.validate()
    const isUsernameValid = usernameRef.value?.validate()
    const isPasswordValid = passwordRef.value?.validate()
    const isConfirmValid = passwordRepeatRef.value?.validate()

    const isFormValid = isEmailValid && isUsernameValid && isPasswordValid && isConfirmValid

    if (!isFormValid) {
      console.warn('Formularz niepoprawny')
      return
    }

    console.log('Formularz poprawny:', { email: email.value, password: password.value })
    const request = {
      email: email.value,
      username: username.value,
      password: password.value,
      passwordRepeat: passwordRepeat.value,
    }
    await AuthService.register(request)
  } catch (err) {
    console.error(err.response.data.message)
  } finally {
    loading.value = false
  }
}
</script>
