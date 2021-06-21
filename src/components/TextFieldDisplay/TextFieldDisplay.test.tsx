import React from 'react';
import {render, screen} from '@testing-library/react';
import TextFieldDisplay, {ComponentProps} from './TextFieldDisplay';

describe('<TextFieldDisplay />', () => {
    const defaultProps: ComponentProps = {
        label: 'Test label',
        value: 'test value'
    };

    it('renders the component', () => {
        const container = render(<TextFieldDisplay {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });

    it('should render the correct label', () => {
        render(<TextFieldDisplay {...defaultProps} />);
        expect(screen.getByText('Test label')).toBeInTheDocument();
    });

    it('should render the correct value', () => {
        render(<TextFieldDisplay {...defaultProps} />);
        expect(screen.getByText('test value')).toBeInTheDocument();
    })
})