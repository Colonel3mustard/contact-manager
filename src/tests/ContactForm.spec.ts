import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe } from 'node:test';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, expect, test } from 'vitest';

import ContactForm from '../components/ContactForm.vue';
import { PhoneNumberTypeEnum } from '../types/Contact';

describe('ContactForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test('renders without crashing', () => {
    const wrapper = mount(ContactForm, {
      props: {
        id: '1',
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('creates new contact when id is not passed in', async () => {
    const wrapper = mount(ContactForm, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.contact).toEqual({
      id: expect.any(Number),
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
    });
  });
});
