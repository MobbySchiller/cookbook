export interface RegisterRequest {
  username: string
  email: string
  password: string
  passwordRepeat: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface User {
  id: number
  username: string
  email: string
  guid: string
}
