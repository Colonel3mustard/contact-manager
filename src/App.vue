<template>
  <div>
    <MustardNavBar :title="navTitle" :items="navProps"></MustardNavBar>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { MustardNavBar, NavItem } from 'mustard-component-framework';
import 'mustard-component-framework/style.css';

const navProps: NavItem[] = [
  { name: 'Home', link: '/' },
  { name: 'Contact List', link: '/list' },
  { name: 'Create Contact', link: '/createEdit' },
];
const navTitle = 'Mustard Contacts';
</script>

<style scoped></style>
