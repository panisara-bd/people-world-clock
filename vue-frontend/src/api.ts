import { API_BASE_URL } from '@/config'
import { useTokenStore } from '@/stores/token'

export type Credentials = {
  username: string
  password: string
}

export type Person = {
  _id?: string
  name: string
  city: string
  country: string
  timeZoneId: string
}

export const logIn = (credentials: Credentials) =>
  fetch(`${API_BASE_URL}/auth/log-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

export const signUp = (credentials: Credentials) =>
  fetch(`${API_BASE_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

export const addPerson = (person: Omit<Person, '_id'>) => {
  const { token } = useTokenStore()
  return fetch(`${API_BASE_URL}/people`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(person)
  })
}

export const deletePerson = (personId: string) => {
  const { token } = useTokenStore()
  return fetch(`${API_BASE_URL}/people/${personId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
}

export const getPeople = () => {
  const { token } = useTokenStore()
  return fetch(`${API_BASE_URL}/people`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
}
