import { Card } from 'mustard-component-framework';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  phoneNumbers: PhoneNumber[];
  salutation: string;
}

export interface ContactList {
  contacts: Contact[];
}

export interface PhoneNumber {
  type: PhoneNumberTypeEnum;
  number: string;
  isPrimary: boolean;
}

export interface ContactCard extends Card {
  id: number;
}

export enum PhoneNumberTypeEnum {
  Cell = 'Cell',
  Work = 'Work',
  Home = 'Home',
}

export enum PhoneNumberColorEnum {
  Cell = 'phoneBlue',
  Work = 'phoneOrange',
  Home = 'phoneGreen',
}
