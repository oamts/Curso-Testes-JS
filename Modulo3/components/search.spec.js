import Search from './search';
import { fireEvent, render, screen } from '@testing-library/react';

const doSearch = jest.fn()

describe('Search', () => {
  it('should render a form', () => {
    render(<Search />)

    expect(screen.getByRole('form')).toBeInTheDocument()
  });

  it('',()=>{
    render(<Search doSearch={doSearch}/>)

    const form = screen.getByRole('form')

    fireEvent.submit(form)

    expect(doSearch).toHaveBeenCalledTimes(1)
  })
});
