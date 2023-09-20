<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <button class="auth-submit-button__button" type="submit">{{ props.label }}</button>
</template>

<style scoped>
.auth-submit-button__button {
  margin-top: 30px;
  width: 100%;
}
</style>
