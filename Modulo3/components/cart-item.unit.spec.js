import CartIem from './cart-item';
import { fireEvent, render, screen } from '@testing-library/react';

const product = {
  title: 'Relógio bonito',
  price: '22.00',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
};

const renderCartItem = () => render(<CartIem product={product} />);

describe('CartIem', () => {
  it('should render ProductCard', function () {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderCartItem();

    const image = screen.getByTestId('image');

    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();
    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveProperty('alt', product.title);
  });

  it('should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should increase quantity by 1 when second button is clicked', () => {
    renderCartItem();

    const [_, button] = screen.getAllByRole('button');

    fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decrease quantity by 1 when first button is clicked', () => {
    renderCartItem();

    const [buttonDecrease, buttonIncrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    fireEvent.click(buttonIncrease);
    expect(quantity.textContent).toBe('2');

    fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('1');
  });

  it('should not go below zero in the quantity', () => {
    renderCartItem();

    const [buttonDecrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    expect(quantity.textContent).toBe('1');

    fireEvent.click(buttonDecrease);
    fireEvent.click(buttonDecrease);

    expect(quantity.textContent).toBe('0');
  });
});
