import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe } from 'node:test';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, expect, test } from 'vitest';
import ContactDetails from '../components/ContactDetails.vue';

describe('ContactDetails', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test('renders without crashing', () => {
    const wrapper = mount(ContactDetails, {
      props: {
        id: '1',
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
