import React from 'react';
import {render, screen} from '@testing-library/react';
import Button, {ComponentProps} from './Button';

describe('<Button />', () => {
    const defaultProps: ComponentProps = {
        onClick: jest.fn,
        children: 'Go back'
    }

   it('renders the component', () => {
       const container = render(<Button {...defaultProps}>Go back</Button>);
       expect(container).toMatchSnapshot();
   });

    it('renders the correct button name', () => {
        render(<Button {...defaultProps}>Go back</Button>);
        expect(screen.getByText('Go back')).toBeTruthy();
    });

    it('should be disabled when not disabled is true', () => {
        const disabledProps: ComponentProps = {
            ...defaultProps,
            disabled: true
        };
        render(<Button {...disabledProps}>Go back</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    })
});