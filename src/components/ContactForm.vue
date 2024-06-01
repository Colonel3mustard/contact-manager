<template>
  <form class="form">
    <div class="imgAndNames">
      <div class="picture">
        <img
          class="image"
          :src="contact.photo !== '' ? contact.photo : getImage('/BlankProfile.jpg')" />
        <MustardInput
          class="imageInput"
          label="Upload Image"
          type="file"
          @fileChange="fileChange"
          v-model="fileModel" />
      </div>
      <MustardInput label="First Name" type="text" v-model="contact.firstName" required />
      <MustardInput label="Last Name" type="text" v-model="contact.lastName" required />
    </div>
    <div class="phoneNumbers" v-for="(number, index) in contact.phoneNumbers" :key="index">
      <div class="phoneNumber">
        <MustardInput
          label="Phone Number"
          type="tel"
          v-model.tel="contact.phoneNumbers[index].number"
          required />
        <MustardSelect
          name="Type:"
          :options="selectOptions"
          v-model="contact.phoneNumbers[index].type"></MustardSelect>
        <MustardCheck
          class="primaryCheck"
          label="Primary"
          :id="index.toString()"
          v-model="contact.phoneNumbers[index].isPrimary" />
        <MustardBtn class="deleteButton" label="Delete" @click.prevent="deletePhoneNumber(index)" />
      </div>
    </div>
    <div>
      <MustardBtn label="Add Phone Number" @click.prevent="addPhoneNumber()" />
    </div>
    <MustardInput label="Salutation" type="text" v-model="contact.salutation" />
    <div>
      <MustardBtn label="Save Contact" @click.prevent="saveContact()" />
      <MustardBtn label="Cancel" @click.prevent="cancelEdit()" />
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  MustardBtn,
  MustardCheck,
  MustardInput,
  MustardSelect,
  SelectOption,
} from 'mustard-component-framework';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useContactStore } from '../store/ContactStore';
import { Contact, PhoneNumberTypeEnum } from '../types/Contact';
import { getImage } from '../utils/contactUtils';

interface Props {
  id?: string;
}

const props = defineProps<Props>();

const contactStore = useContactStore();

const router = useRouter();

const contactId = ref(Number(props.id));

const contact = ref(loadContact());

const fileModel = ref('');

const selectOptions: SelectOption[] = [
  { value: PhoneNumberTypeEnum.Cell, label: 'Cell' },
  { value: PhoneNumberTypeEnum.Home, label: 'Home' },
  { value: PhoneNumberTypeEnum.Work, label: 'Work' },
];

function loadContact(): Contact {
  // if id is passed in, load the contact with that id
  if (props.id) {
    const retValue = contactStore.getContactById(contactId.value);
    if (retValue) {
      return JSON.parse(JSON.stringify(retValue));
    } else {
      router.push('/404');
      throw new Error('Contact not found');
    }
    // if id is not passed in, create a new contact
  } else {
    const newContact: Contact = {
      id: getNewId(),
      firstName: '',
      lastName: '',
      phoneNumbers: [
        {
          number: '',
          type: PhoneNumberTypeEnum.Cell,
          isPrimary: true,
        },
      ],
      photo: '',
      salutation: '',
    };
    return newContact;
  }
}

// get the next id for a new contact
function getNewId(): number {
  const contacts = contactStore.getContactsList;
  const maxId = contacts.reduce((acc, curr) => {
    return curr.id > acc ? curr.id : acc;
  }, 0);
  return maxId + 1;
}

function deletePhoneNumber(index: number): void {
  if (contact.value.phoneNumbers.length === 1) {
    alert('You must have at least one phone number.');
    return;
  }
  contact.value.phoneNumbers.splice(index, 1);
}

function addPhoneNumber(): void {
  contact.value.phoneNumbers.push({
    number: '',
    type: PhoneNumberTypeEnum.Cell,
    isPrimary: false,
  });
}

function fileChange(url: string) {
  contact.value.photo = url;
}

function saveContact(): void {
  if (canSave()) {
    if (props.id) {
      contactStore.editContact(contact.value);
    } else {
      contactStore.addContact(contact.value);
    }
  } else {
    alert('Please fill out all required fields and select exactly one primary phone number.');
  }
}

// check if the form is valid
function canSave(): boolean {
  const isOnlyOneNumberPrimary =
    contact.value.phoneNumbers.filter((number) => number.isPrimary).length === 1;
  return document.getElementsByClassName('invalid').length === 0 && isOnlyOneNumberPrimary;
}

function cancelEdit(): void {
  if (props.id) {
    router.push('/details/' + contact.value.id);
  } else {
    router.push('/list');
  }
}
</script>

<style scoped>
.phoneNumbers {
  margin: 0 0 5px 380px;
}

.phoneNumber {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.deleteButton {
  background-color: #de3c4b;
  margin-top: 15px;
}

.deleteButton:hover {
  background-color: #bb323f;
}

.primaryCheck {
  margin-top: 15px;
}

.picture {
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
}

.image {
  display: block;
  max-width: 400px;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 20px;
  border: 5px solid #003566;
}
.imgAndNames {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}
</style>
