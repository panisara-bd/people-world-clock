<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { deletePerson, Person } from '@/api'
import { getFormattedTime } from '@/helpers/getFormattedTime'
import { usePeopleStore } from '@/stores/people'

const props = defineProps<{ person: Person }>()

const peopleStore = usePeopleStore()

const isActive = ref(false)
const timeIntervalId = ref<number | null>(null)
const time = ref<string>('')
const formattedTime = computed(() => getFormattedTime(time.value, props.person.timeZoneId))

const handleDelete = async () => {
  await deletePerson(props.person._id!)
  await peopleStore.fetchPeople()
}

onMounted(() => {
  timeIntervalId.value = setInterval(() => {
    time.value = new Date().toLocaleTimeString('en', { timeZone: props.person.timeZoneId })
  }, 1000)
})

onUnmounted(() => {
  if (timeIntervalId.value !== null) {
    clearInterval(timeIntervalId.value)
  }
})
</script>

<template>
  <div :class="`card card--${formattedTime.timeOfDay}`" @click="isActive = !isActive">
    <div v-if="isActive" class="card__delete" @click="handleDelete">x</div>
    <p class="card__name">{{ props.person.name }}</p>
    <p class="card__location">{{ props.person.city }}, {{ props.person.country }}</p>
    <p class="card__time">
      {{ formattedTime.hour }}:{{ formattedTime.minute }} {{ formattedTime.ampm }}
    </p>
  </div>
</template>

<style scoped>
.card {
  display: block;
  position: relative;
  width: 200px;
  padding: 10px 20px;
  border: 3px solid #000;
  border-radius: 20px;
  cursor: pointer;
}

.card__delete {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  background-color: #f0761e;
  border-radius: 20px;
  text-align: center;
  line-height: 27px;
  font-size: 16px;
  font-weight: 800;
  border: 3px solid black;
}

.card__name {
  margin-bottom: 150px;
  font-size: 24px;
  font-weight: 600;
}

.card__location {
  text-align: right;
  font-size: 14px;
  font-weight: 600;
}

.card__time {
  font-weight: 700;
  text-align: right;
  font-size: 26px;
}

.card--morning {
  background: rgb(255, 154, 111);
  background: linear-gradient(
    0deg,
    rgb(255, 177, 74) 0%,
    rgba(224, 211, 171, 1) 30%,
    rgba(172, 211, 241, 1) 48%,
    rgb(105, 197, 255) 100%
  );
}

.card--afternoon {
  background: rgb(172, 218, 241);
  background: linear-gradient(
    0deg,
    rgb(123, 211, 255) 5%,
    rgba(255, 231, 156, 1) 59%,
    rgb(255, 205, 104) 100%
  );
}

.card--evening {
  background: rgb(255, 129, 106);
  background: linear-gradient(0deg, rgb(210, 79, 112) 5%, rgb(67, 134, 242) 100%);
}

.card--night {
  background: rgb(34, 74, 164);
  background: linear-gradient(
    0deg,
    rgb(45, 89, 191) 0%,
    rgb(87, 129, 227) 50%,
    rgb(103, 175, 242) 100%
  );
}
</style>
