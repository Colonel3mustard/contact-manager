import { Card } from 'mustard-component-framework';
import { defineStore } from 'pinia';
import { getImage } from '../utils/contactUtils';

interface State {
  contacts: Card[];
}

export const useContactStore = defineStore('contact', {
  state: (): State => {
    return {
      contacts: [
        {
          title: 'Greg Bennett',
          subtitle: '(626) 485-2957',
          imgSrc: getImage('../assets/Profile1.jpg'),
        },
        {
          title: 'Ann Johnson',
          subtitle: '(513) 903-8042',
          imgSrc: getImage('../assets/Profile2.jpg'),
        },
        {
          title: 'Amy Tanner',
          subtitle: '(513) 967-3951',
          imgSrc: getImage('../assets/Profile3.jpg'),
        },
        {
          title: 'Jen Riley',
          subtitle: '(513) 339-9935',
          imgSrc: getImage('../assets/Profile4.jpg'),
        },
        {
          title: 'Tom Jones',
          subtitle: '(513) 069-4886',
          imgSrc: getImage('../assets/Profile5.jpg'),
        },
        {
          title: 'Russell Thompson',
          subtitle: '(626) 445-2217',
          imgSrc: getImage('../assets/Profile6.jpg'),
        },
      ],
    };
  },
  getters: {
    getContacts(state): Card[] {
      return state.contacts;
    },
  },
  actions: {
    addContact(contact: Card) {
      this.contacts.push(contact);
    },
    deleteContact(index: number) {
      this.contacts.splice(index, 1);
    },
    editContact(index: number, contact: Card) {
      this.contacts[index] = contact;
    },
  },
});
