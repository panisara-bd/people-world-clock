<script setup lang="ts">
const props = defineProps<{
  label: string
  id: string
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <label class="auth-field__label" :for="props.id">{{ props.label }}</label>
  <input
    class="auth-field__input"
    type="text"
    :id="props.id"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
.auth-field__label {
  margin: 20px 0 5px 0;
  display: block;
}

.auth-field__input {
  display: block;
}
</style>
