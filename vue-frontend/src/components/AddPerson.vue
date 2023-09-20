<script setup lang="ts">
import {} from '@types/google.maps'
import { onMounted, ref } from 'vue'
import { addPerson } from '@/api'
import { API_KEY } from '@/config'
import { usePeopleStore } from '@/stores/people'

type LocationInfo = {
  city: string
  country: string
  timeZoneId: string
}

const peopleStore = usePeopleStore()
const personName = ref('')
const placeInput = ref<HTMLInputElement | null>(null)
const locationInfo = ref<LocationInfo | null>(null)
const errorMessage = ref('')

onMounted(() => {
  const autocomplete = new window.google.maps.places.Autocomplete(placeInput.value!, {
    fields: ['address_components', 'geometry', 'name'],
    types: ['locality']
  })

  autocomplete.addListener('place_changed', async () => {
    const place = autocomplete.getPlace()
    const city =
      place.address_components?.find((component) => component.types.includes('locality'))
        ?.long_name || ''
    const country =
      place.address_components?.find((component) => component.types.includes('country'))
        ?.long_name || ''
    const lat = place.geometry?.location?.lat()
    const lng = place.geometry?.location?.lng()
    const timestamp = Math.round(Date.now() / 1000)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${timestamp}&key=${API_KEY}`
    )
    const { timeZoneId } = await response.json()
    locationInfo.value = { city, country, timeZoneId }
  })
})

const handleFormSubmit = async () => {
  errorMessage.value = ''

  if (personName.value === '' || locationInfo.value === null) {
    errorMessage.value = 'Please provide name and location'
    return
  }

  try {
    const res = await addPerson({
      name: personName.value,
      ...locationInfo.value
    })

    if (res.status === 201) {
      personName.value = ''
      locationInfo.value = null
      await peopleStore.fetchPeople()
    } else {
      errorMessage.value = 'Please provide name and location'
    }
  } catch (err) {
    errorMessage.value = 'Cannot create person'
  }
}

const onLocationFocus = () => {
  if (!placeInput.value) {
    return
  }

  placeInput.value.value = ''
  locationInfo.value = null
}
</script>

<template>
  <div>
    <form class="add-person__form" @submit.prevent="handleFormSubmit">
      <label for="personName">Name:</label>
      <input
        type="text"
        id="personName"
        placeholder="Enter name"
        v-model="personName"
        autoComplete="off"
      />
      <label for="place">Location:</label>
      <input type="text" id="place" ref="placeInput" @focus="onLocationFocus" />
      <button type="submit">Add</button>
    </form>
    <div class="add-person__err-message">
      <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.add-person__form {
  display: flex;
  margin: 10px;
  align-items: center;
}
</style>
