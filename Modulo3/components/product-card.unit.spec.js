import ProductCard from './product-card';
import { fireEvent, render, screen } from '@testing-library/react';

const product = {
  title: 'Relógio bonito',
  price: '22.00',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
};

const addToCart = jest.fn();

const renderProducts = () =>
  render(<ProductCard product={product} addToCart={addToCart} />);

describe('ProductCard', () => {
  it('should render ProductCard', function () {
    renderProducts();

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderProducts();

    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it('should call addToCart() when button gets clicked', function () {
    renderProducts();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
