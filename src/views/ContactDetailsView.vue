<template>
  <ContactDetails :id></ContactDetails>
</template>

<script setup lang="ts">
import ContactDetails from '../components/ContactDetails.vue';
interface Props {
  id: string;
}

defineProps<Props>();
</script>

<style scoped></style>
