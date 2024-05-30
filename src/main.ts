import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';
import ContactCreate from './views/ContactCreate.vue';
import ContactDetails from './views/ContactDetails.vue';
import ContactHome from './views/ContactHome.vue';
import ContactList from './views/ContactList.vue';
import NotFound from './views/NotFound.vue';

const routes = [
  { path: '/', component: ContactHome },
  { path: '/create', component: ContactCreate },
  { path: '/list', component: ContactList },
  { path: '/details/:id', component: ContactDetails },
  // will match everything and put it under `route.params.pathMatch`
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');
