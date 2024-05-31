<template>
  <ContactForm :id></ContactForm>
</template>

<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue';
interface Props {
  id?: string;
}

defineProps<Props>();
</script>

<style scoped></style>
