import ProductList from '../pages';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { makeServer } from '../miragejs/server';
import Response from 'miragejs';
import userEvent from '@testing-library/user-event';

const renderProductList = () => {
  render(<ProductList />);
};

describe('ProductList', function () {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render ProductList', function () {
    renderProductList();

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  it('should render the ProductCard component 10 times', async () => {
    server.createList('product', 10);

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10);
    });
  });

  it('should render the "no products message"', async function () {
    renderProductList();

    expect(screen.getByTestId('no-products')).toBeInTheDocument();
  });

  it('should display error message when promise rejects', async function () {
    server.get('products', () => {
      return new Response(500, {}, '');
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId('server-error')).toBeInTheDocument();
      expect(screen.queryByTestId('no-products')).toBeNull();
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0);
    });
  });

  it('should filter the product list when a search is performed', async () => {
    const searchTerm = 'Relógio bonito';

    server.createList('product', 2);

    server.create('product', {
      title: searchTerm,
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(3);
    });

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, searchTerm);
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(1);
    });
  });

  it.todo('should display error message when promise rejects');
  it.todo('should display the total quantity of products');
  it.todo('should display product (singular) when there is only 1 product');
});
