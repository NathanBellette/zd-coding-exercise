import React from 'react';
import {fireEvent, getByText, render, screen} from '@testing-library/react';
import TextField, {ComponentProps} from './TextField';

describe('<TextField />', () => {
    const defaultProps: ComponentProps = {
        id: 'test1',
        label: 'Test label',
        value: '10',
        name: 'testName',
        onChange: jest.fn
    };

   it('should render correctly', () => {
        const container = render(<TextField {...defaultProps} />);
        expect(container).toMatchSnapshot();
   });

   it('renders the correct label', () => {
       render(<TextField {...defaultProps} />);
       expect(screen.getByText('Test label')).toBeInTheDocument();
   });

   it('renders the correct value', () => {
       render(<TextField {...defaultProps} />);
       expect(screen.getByDisplayValue('10')).toBeInTheDocument();
   })
});