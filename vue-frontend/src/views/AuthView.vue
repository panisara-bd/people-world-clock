<script setup lang="ts">
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
</script>

<template>
  <div class="login-signup">
    <h1>Welcome to an awesome World Clock!</h1>
    <LogIn />
    <p>Don't have account yet? Sign Up ⬇</p>
    <SignUp />
  </div>
</template>

<style scoped>
.login-signup {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-top: 50px;
}

h2 {
  margin: 10px 0 0 0;
}
</style>
