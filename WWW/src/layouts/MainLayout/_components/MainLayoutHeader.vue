<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <!-- Logo -->
        <RouterLink :to="{ name: 'Home' }" class="flex items-center">
          <span class="self-center text-xl font-serif whitespace-nowrap">Książka Kucharska</span>
        </RouterLink>

        <!-- Prawa strona (logowanie/wylogowanie + hamburger) -->
        <div class="flex items-center lg:order-2">
          <RouterLink
            v-if="!user"
            :to="{ name: 'SignIn' }"
            class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hidden lg:block"
          >
            Zaloguj się
          </RouterLink>
          <RouterLink
            v-if="!user"
            :to="{ name: 'SignUp' }"
            class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hidden lg:block"
          >
            Załóż konto
          </RouterLink>
          <button
            v-if="user"
            class="cursor-pointer text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hidden lg:block"
            @click="handleLogoutBtn"
          >
            Wyloguj się
          </button>

          <!-- Hamburger button -->
          <button
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!isMobileMenuOpen"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Nawigacja -->
        <div
          :class="['w-full lg:flex lg:w-auto lg:order-1', isMobileMenuOpen ? 'block' : 'hidden']"
          id="mobile-menu-2"
        >
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <RouterLink
                v-if="user"
                :to="{ name: 'RecipesCreate' }"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0"
                @click="isMobileMenuOpen = false"
              >
                Dodaj przepis
              </RouterLink>
            </li>
            <li>
              <RouterLink
                v-if="user"
                :to="{ name: 'RecipesFavourites' }"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0"
                @click="isMobileMenuOpen = false"
              >
                Ulubione przepisy
              </RouterLink>
            </li>
            <li>
              <RouterLink
                v-if="user"
                :to="{ name: 'RecipesYours' }"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0"
                @click="isMobileMenuOpen = false"
              >
                Twoje przepisy
              </RouterLink>
            </li>

            <!-- Opcje logowania na mobile -->
            <li v-if="!user" class="lg:hidden">
              <RouterLink
                :to="{ name: 'SignIn' }"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 lg:p-0"
                @click="isMobileMenuOpen = false"
              >
                Zaloguj się
              </RouterLink>
            </li>
            <li v-if="!user" class="lg:hidden">
              <RouterLink
                :to="{ name: 'SignUp' }"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 lg:p-0"
                @click="isMobileMenuOpen = false"
              >
                Załóż konto
              </RouterLink>
            </li>
            <li v-if="user" class="lg:hidden">
              <button
                class="w-full text-left block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 lg:p-0"
                @click="handleLogoutBtn"
              >
                Wyloguj się
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { AuthService } from '@/api/Auth'
import { useUserStore } from '@/stores/useUserStore'

const { user } = useUserStore()
const isMobileMenuOpen = ref(false)

async function handleLogoutBtn() {
  try {
    await AuthService.logout()
    location.reload()
  } catch (err) {}
}
</script>
