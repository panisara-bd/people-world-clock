import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Person } from '@/api'
import { getPeople } from '@/api'

export const usePeopleStore = defineStore('people', () => {
  const people = ref<Person[]>([])

  const fetchPeople = async () => {
    const response = await getPeople()
    if (response.ok) {
      people.value = await response.json()
    }
  }

  return { people, fetchPeople }
})
