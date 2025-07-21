import type { Ref } from 'vue'

export function useValidation() {
  const required = (val: string) => !!val || 'Pole jest wymagane'

  const validEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Nieprawidłowy adres email'
  const minLength = (min: number) => (val: string) => val.length >= min || `Minimum ${min} znaków`

  const hasUpperCase = (val: string) => /[A-Z]/.test(val) || 'Musi zawierać dużą literę'

  const hasNumber = (val: string) => /\d/.test(val) || 'Musi zawierać cyfrę'

  const hasSpecialChar = (val: string) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(val) || 'Musi zawierać znak specjalny'

  const sameAs = (otherValue: string) => (val: string) =>
    val === otherValue || 'Hasła muszą być takie same'

  return {
    required,
    validEmail,
    minLength,
    hasUpperCase,
    hasNumber,
    hasSpecialChar,
    sameAs,
  }
}
