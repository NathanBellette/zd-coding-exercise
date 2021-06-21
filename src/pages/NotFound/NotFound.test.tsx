import React from 'react';
import {render, screen} from '@testing-library/react';
import NotFound, {ComponentProps} from './NotFound';

describe('<NotFound />', () => {
  it('renders the component', () => {
     const container = render(<NotFound />);
     expect(container).toMatchSnapshot();
  });

  it('renders the default not found message when none provided', () => {
      render(<NotFound />);
      expect(screen.getByText('Oops Page not found!')).toBeInTheDocument();
  });

  it('renders a custom message when one is provided', () => {
     const props: ComponentProps = {
         message: 'Updated not found message'
     };
     render(<NotFound {...props} />);
     expect(screen.getByText('Updated not found message')).toBeInTheDocument();
  });
});