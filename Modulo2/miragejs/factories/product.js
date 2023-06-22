import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

export default {
  product: Factory.extend({
    title() {
      return faker.lorem.words();
    },
    price() {
      return faker.commerce.price();
    },
  }),
};
