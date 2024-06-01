import { createRouter, createWebHistory } from 'vue-router';
import ContactCreateEditView from '../views/ContactCreateEditView.vue';
import ContactDetailsView from '../views/ContactDetailsView.vue';
import ContactHomeView from '../views/ContactHomeView.vue';
import ContactListView from '../views/ContactListView.vue';
import NotFoundView from '../views/NotFoundView.vue';

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

export default router;
