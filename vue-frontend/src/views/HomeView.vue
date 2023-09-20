<script setup lang="ts">
import PersonCard from '@/components/PersonCard.vue'
import { onMounted } from 'vue'
import AddPerson from '@/components/AddPerson.vue'
import { usePeopleStore } from '@/stores/people'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'

const tokenStore = useTokenStore()
const peopleStore = usePeopleStore()
const router = useRouter()

const logOut = () => {
  tokenStore.updateToken(null)
  router.push('/auth')
}

onMounted(peopleStore.fetchPeople)
</script>

<template>
  <main class="app">
    <p class="app__greeting">Hello, {{ tokenStore.token?.split(':')[0] }}!</p>
    <button class="app__log-out" type="button" @click.prevent="logOut">Log out</button>
    <AddPerson />
    <div class="card-gallery">
      <PersonCard v-for="person in peopleStore.people" :key="person._id" :person="person" />
    </div>
  </main>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app__log-out {
  position: absolute;
  right: 80px;
  top: 50px;
}

.app__greeting {
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  flex: 1 0 auto;
}

.card-gallery {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  max-width: 1000px;
  margin-top: 50px;
  justify-content: center;
}

button {
  background-color: #ffe564;
  padding: 10px 20px;
  margin-inline: 5px;
  border: #000 solid 2px;
  outline: 0;
  border-radius: 10px;
  font-weight: 550;
}
</style>
