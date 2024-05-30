<template>
  <div class="cardList">
    <router-link
      :to="'/details/' + index"
      v-for="(item, index) in contactStore.getContacts"
      :key="index">
      <MustardCard :item="item" class="card"></MustardCard
    ></router-link>
  </div>
</template>

<script setup lang="ts">
import { MustardCard } from 'mustard-component-framework';
import { useContactStore } from '../store/ContactStore';

const contactStore = useContactStore();
</script>

<style scoped>
.cardList {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  width: 400px;
  cursor: pointer;
}
</style>
