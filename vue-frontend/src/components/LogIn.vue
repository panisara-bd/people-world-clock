<script setup lang="ts">
import { ref } from 'vue'
import { logIn } from '@/api'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import AuthField from '@/components/AuthField.vue'
import AuthSubmitButton from '@/components/AuthSubmitButton.vue'

const router = useRouter()
const username = ref<string>('')
const password = ref<string>('')
const error = ref<string | null>(null)
const tokenStore = useTokenStore()

const handleSubmit = async () => {
  error.value = null

  const response = await logIn({
    username: username.value,
    password: password.value
  })

  const data = await response.json()
  if (response.ok) {
    tokenStore.updateToken(data.token)
    await router.push({ name: 'home' })
  } else {
    error.value = data.message
  }
}
</script>

<template>
  <div class="log-in__container">
    <h2>Log In</h2>
    <form @submit.prevent="handleSubmit">
      <AuthField id="log-in__username" v-model="username" label="Username" />
      <AuthField id="log-in__password" v-model="password" label="Password" />
      <div>
        <AuthSubmitButton label="Log In" />
        <p v-if="error" class="text-error">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.log-in__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 30px;
  width: 80%;
}
</style>
