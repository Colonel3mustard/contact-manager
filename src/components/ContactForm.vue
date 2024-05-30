<template>
  <form>
    <MustardInput label="First Name" v-model="firstName" />
    <MustardInput label="Last Name" v-model="lastName" />
  </form>
</template>

<script setup lang="ts">
import { MustardInput } from 'mustard-component-framework';
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
</script>

<style scoped></style>
