<script setup lang="ts">
import { ref } from 'vue'
import { signUp } from '@/api'
import AuthField from '@/components/AuthField.vue'
import AuthSubmitButton from '@/components/AuthSubmitButton.vue'

const username = ref<string>('')
const password = ref<string>('')
const isRegistered = ref<boolean>(false)
const error = ref<string | null>(null)

const handleSubmit = async () => {
  isRegistered.value = false
  error.value = null

  const response = await signUp({
    username: username.value,
    password: password.value
  })

  const data = await response.json()
  if (response.ok) {
    isRegistered.value = true
  } else {
    error.value = data.message
  }

  username.value = ''
  password.value = ''
}
</script>

<template>
  <div class="sign-up__container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSubmit">
      <AuthField id="sign-up__username" v-model="username" label="Create Username" />
      <AuthField id="sign-up__password" v-model="password" label="Create Password" />
      <div>
        <AuthSubmitButton label="Sign Up" />
        <p v-if="isRegistered" class="text-success">You Are Registered Successfully</p>
        <p v-if="error" class="text-error">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.sign-up__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: #000 solid 2px;
  padding-top: 30px;
  width: 80%;
}
</style>
