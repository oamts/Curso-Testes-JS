import Cart from './cart';

let cart;

let product = {
  title: 'shoes - men',
  price: '35388', //355.88 | R$383,88
};

let product2 = {
  title: 'shoes - women',
  price: '41872', //355.88 | R$383,88
};

beforeEach(() => {
  cart = new Cart();
});

describe('Cart', () => {
  describe('getTotal()', () => {
    it('should return 0 when getTotal is executed in a newly created instance', () => {
      expect(cart.getTotal()).toEqual(0);
    });

    it('should multiply quantity and price and recieve the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(70776);
    });

    it('should ensure no more than one procuct exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal()).toEqual(41872);
    });
  });
});

describe('cehckout()', () => {
  it('should return an object with the total and the list of items', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product: product2,
      quantity: 3,
    });

    expect(cart.checkout()).toMatchSnapshot();
  });

  it('should return an object with the total and the list of items when summary() is called', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product: product2,
      quantity: 3,
    });

    expect(cart.summary()).toMatchSnapshot();
    expect(cart.getTotal()).toBeGreaterThan(0);
  });

  it('should reset the cart when checkout is called', () => {
    cart.add({
      product: product2,
      quantity: 3,
    });

    cart.checkout();

    expect(cart.getTotal()).toEqual(0);
  });
});
