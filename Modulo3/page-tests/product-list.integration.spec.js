import ProductList from '../pages';
import { screen, render } from '@testing-library/react';

describe('ProductList', function () {
  it('should render ProductList', function () {
    render(<ProductList />);

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });
});
