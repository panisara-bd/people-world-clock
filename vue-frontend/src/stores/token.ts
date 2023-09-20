import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { customRef } from 'vue'

const useTokenRef = (): Ref<string | null> =>
  customRef<string | null>((track, trigger) => ({
    get: () => {
      track()
      return localStorage.getItem('token')
    },
    set: (value) => {
      if (value === null) {
        localStorage.removeItem('token')
      } else {
        localStorage.setItem('token', value)
      }
      trigger()
    }
  }))

export const useTokenStore = defineStore('token', () => {
  const token = useTokenRef()

  const updateToken = (newToken: string | null) => (token.value = newToken)

  return { token, updateToken }
})
