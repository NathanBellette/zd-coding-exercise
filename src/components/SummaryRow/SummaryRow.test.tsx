import React from 'react';
import {render, screen} from '@testing-library/react';
import SummaryRow, {ComponentProps} from './SummaryRow';

describe('<SummaryRow />', () => {
    const defaultProps: ComponentProps = {
        label: 'Test',
        value: 100
    };

    it('renders the component', () => {
        const container = render(<SummaryRow {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });

    it('renders the correct label', () => {
       render(<SummaryRow {...defaultProps} />);
       expect(screen.getByText('Test')).toBeTruthy();
    });

    it('renders the correct value', () => {
        render(<SummaryRow {...defaultProps} />);
        expect(screen.getByText('100')).toBeTruthy();
    })
});