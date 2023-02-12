import Cart from './cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'shoes',
    price: '35388', //355.88 | R$383,88
  };

  beforeEach(() => {
    cart = new Cart();
  });

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

  fit('should ensure no more than one procuct exists at a time', () => {
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
});
