import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import App from './App.vue';
import './style.css';
import ContactCreateEditView from './views/ContactCreateEditView.vue';
import ContactDetailsView from './views/ContactDetailsView.vue';
import ContactHomeView from './views/ContactHomeView.vue';
import ContactListView from './views/ContactListView.vue';
import NotFoundView from './views/NotFoundView.vue';

const routes = [
  { path: '/', component: ContactHomeView },
  { path: '/createEdit/:id?', component: ContactCreateEditView, props: true },
  { path: '/list', component: ContactListView },
  { path: '/details/:id', component: ContactDetailsView, props: true },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App).use(router).use(pinia).mount('#app');
