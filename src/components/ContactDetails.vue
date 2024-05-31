<template>
  <div class="detailsPage">
    <img class="profilePic" :src="contact.photo" />
    <h1 class="name">{{ getContactDisplayName() }}</h1>
    <h2 class="salutation">{{ contact.salutation }}</h2>
    <div class="phoneList">
      <div v-for="(phone, index) in contact.phoneNumbers" :key="index">
        <div :class="PhoneNumberColorEnum[phone.type]">
          <p>{{ phone.type }}</p>
          <p>{{ phone.number }}</p>
          <p v-if="phone.isPrimary"><i class="fa-solid fa-check-double"></i>Primary</p>
        </div>
      </div>
    </div>
    <div class="buttons">
      <RouterLink :to="'/edit/' + contactId">
        <MustardBtn label="Edit Contact" @click.prevent="editContact()" />
      </RouterLink>
      <MustardBtn label="Delete Contact" @click.prevent="openDialog()" :loading />
    </div>
    <dialog aria-labelledby="dialogTitle">
      <h2 id="dialogTitle" class="h2">Are you sure you want to delete this contact?</h2>
      <div class="buttons">
        <MustardBtn label="Confirm" @click.prevent="deleteContact()" />
        <MustardBtn label="Cancel" @click.prevent="closeDialog()" />
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { MustardBtn } from 'mustard-component-framework';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useContactStore } from '../store/ContactStore';
import { Contact, PhoneNumberColorEnum } from '../types/Contact';
interface Props {
  id: string;
}

const props = defineProps<Props>();

const contactStore = useContactStore();

const router = useRouter();

const contactId = ref(Number(props.id));

const contact: Contact = loadContact();

const loading = ref(false);

function loadContact(): Contact {
  const retValue = contactStore.getContactById(contactId.value);
  if (retValue) {
    return retValue;
  } else {
    router.push('/404');
    throw new Error('Contact not found');
  }
}

function getContactDisplayName(): string {
  return `${contact.firstName} ${contact.lastName}`;
}

function deleteContact(): void {
  closeDialog();
  contactStore.deleteContact(contactId.value);
  loading.value = false;
}

function openDialog(): void {
  loading.value = true;
  const dialog = document.querySelector('dialog');
  if (!dialog) return;
  dialog.showModal();
}

function closeDialog(): void {
  loading.value = false;
  const dialog = document.querySelector('dialog');
  if (!dialog) return;
  dialog.close();
}

function editContact(): void {
  router.push(`/createEdit/${contactId.value}`);
}
</script>

<style scoped>
.detailsPage {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profilePic {
  height: 400px;
  border-radius: 20px;
  border: 5px solid #003566;
}

.phoneList {
  font-family: 'Comfortaa', sans-serif;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

.phoneGreen {
  color: #1a936f;
  border-radius: 20px;
  border: 5px solid #1a936f;
  padding: 0px 10px;
  background-color: whitesmoke;
}

.phoneBlue {
  color: #258ea6;
  border-radius: 20px;
  border: 5px solid #258ea6;
  padding: 0px 10px;
  background-color: whitesmoke;
}

.phoneOrange {
  color: #ef8354;
  border-radius: 20px;
  border: 5px solid #ef8354;
  padding: 0px 10px;
  background-color: whitesmoke;
}

.name {
  font-family: 'Comfortaa', sans-serif;
  color: #003566;
  margin-bottom: 0;
}

.salutation {
  font-family: 'Comfortaa', sans-serif;
  color: #003566;
}

.buttons {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

dialog {
  border: 5px solid #003566;
  border-radius: 20px;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 20px;
  max-width: 400px;
  font-family: 'Comfortaa', sans-serif;
  color: #003566;
}
</style>
