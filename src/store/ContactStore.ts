import { defineStore } from 'pinia';
import { Contact, ContactCard, PhoneNumberTypeEnum } from '../types/Contact';
import { getImage } from '../utils/contactUtils';

interface State {
  contacts: Contact[];
}

export const useContactStore = defineStore('contact', {
  state: (): State => {
    return {
      contacts: [
        {
          id: 1,
          firstName: 'Greg',
          lastName: 'Harris',
          phoneNumbers: [
            {
              type: PhoneNumberTypeEnum.Cell,
              number: '(626) 485-2957',
              isPrimary: true,
            },
            {
              type: PhoneNumberTypeEnum.Home,
              number: '(626) 485-2957',
              isPrimary: false,
            },
            {
              type: PhoneNumberTypeEnum.Work,
              number: '(626) 485-2957',
              isPrimary: false,
            },
          ],
          photo: getImage('../assets/Profile1.jpg'),
          salutation: "Hi, I'm Greg!",
        },
        {
          id: 2,
          firstName: 'Ann',
          lastName: 'Johnson',
          phoneNumbers: [
            {
              type: PhoneNumberTypeEnum.Cell,
              number: '(513) 903-8042',
              isPrimary: true,
            },
            {
              type: PhoneNumberTypeEnum.Home,
              number: '(513) 903-8042',
              isPrimary: false,
            },
            {
              type: PhoneNumberTypeEnum.Work,
              number: '(513) 903-8042',
              isPrimary: false,
            },
          ],
          photo: getImage('../assets/Profile2.jpg'),
          salutation: "Hi, I'm Ann!",
        },
        {
          id: 3,
          firstName: 'Amy',
          lastName: 'Tanner',
          phoneNumbers: [
            {
              type: PhoneNumberTypeEnum.Cell,
              number: '(513) 967-3951',
              isPrimary: true,
            },
            {
              type: PhoneNumberTypeEnum.Home,
              number: '(513) 967-3951',
              isPrimary: false,
            },
            {
              type: PhoneNumberTypeEnum.Work,
              number: '(513) 967-3951',
              isPrimary: false,
            },
          ],
          photo: getImage('../assets/Profile3.jpg'),
          salutation: "Hi, I'm Amy!",
        },
        {
          id: 4,
          firstName: 'Jen',
          lastName: 'Riley',
          phoneNumbers: [
            {
              type: PhoneNumberTypeEnum.Cell,
              number: '(513) 339-9935',
              isPrimary: true,
            },
            {
              type: PhoneNumberTypeEnum.Home,
              number: '(513) 339-9936',
              isPrimary: false,
            },
            {
              type: PhoneNumberTypeEnum.Work,
              number: '(513) 339-9937',
              isPrimary: false,
            },
          ],
          photo: getImage('../assets/Profile4.jpg'),
          salutation: "Hi, I'm Jen!",
        },
        {
          id: 5,
          firstName: 'Tom',
          lastName: 'Jones',
          phoneNumbers: [
            {
              type: PhoneNumberTypeEnum.Cell,
              number: '(513) 069-4886',
              isPrimary: true,
            },
            {
              type: PhoneNumberTypeEnum.Home,
              number: '(513) 069-4887',
              isPrimary: false,
            },
            {
              type: PhoneNumberTypeEnum.Work,
              number: '(513) 069-4888',
              isPrimary: false,
            },
          ],
          photo: getImage('../assets/Profile5.jpg'),
          salutation: "Hi, I'm Tom!",
        },
        {
          id: 6,
          firstName: 'Russell',
          lastName: 'Thompson',
          phoneNumbers: [
            {
              type: PhoneNumberTypeEnum.Cell,
              number: '(626) 445-2217',
              isPrimary: true,
            },
            {
              type: PhoneNumberTypeEnum.Home,
              number: '(626) 445-2218',
              isPrimary: false,
            },
            {
              type: PhoneNumberTypeEnum.Work,
              number: '(626) 445-2219',
              isPrimary: false,
            },
          ],
          photo: getImage('../assets/Profile6.jpg'),
          salutation: "Hi, I'm Russell!",
        },
      ],
    };
  },
  getters: {
    getContactsList(state): ContactCard[] {
      return state.contacts.map((contact) => {
        const primaryNumber = contact.phoneNumbers.find((phoneNumber) => phoneNumber.isPrimary);
        const card: ContactCard = {
          id: contact.id,
          title: `${contact.firstName} ${contact.lastName}`,
          subtitle: primaryNumber?.number || 'No phone number',
          imgSrc: contact.photo,
        };
        return card;
      });
    },
    getContactById:
      (state) =>
      (id: number): Contact | null => {
        const index = state.contacts.findIndex((contact) => contact.id === id);
        if (index === -1) {
          return null;
        }
        return state.contacts[index];
      },
  },
  actions: {
    addContact(contact: Contact) {
      this.contacts.push(contact);
      this.router.push('/details/' + contact.id);
    },
    deleteContact(id: number) {
      const index = this.contacts.findIndex((contact) => contact.id === id);
      if (index === -1) {
        throw new Error('Contact not found');
      }
      this.contacts.splice(index, 1);
      this.router.push('/list');
    },
    editContact(editedContact: Contact) {
      const index = this.contacts.findIndex((contact) => contact.id === editedContact.id);
      if (index === -1) {
        throw new Error('Contact not found');
      }
      this.contacts[index] = editedContact;
      this.router.push('/details/' + editedContact.id);
    },
    deletePhoneNumber(id: number, phoneNumberIndex: number) {
      const index = this.contacts.findIndex((contact) => contact.id === id);
      if (index === -1) {
        throw new Error('Contact not found');
      }
      this.contacts[index].phoneNumbers.splice(phoneNumberIndex, 1);
    },
  },
});
