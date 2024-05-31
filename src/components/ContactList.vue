<template>
  <div class="cardList">
    <router-link
      :to="'/details/' + item.id"
      v-for="(item, index) in contactStore.getContactsList"
      :key="index"
      class="routerLink">
      <MustardCard :item="item" class="card"></MustardCard
    ></router-link>
    <RouterLink to="/createEdit">
      <MustardBtn label="Create Contact" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { MustardBtn, MustardCard } from 'mustard-component-framework';
import { useContactStore } from '../store/ContactStore';

const contactStore = useContactStore();
</script>

<style scoped>
.cardList {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  gap: 20px;
}

.card {
  width: 400px;
  cursor: pointer;
}

.routerLink {
  width: 400px;
}
</style>
