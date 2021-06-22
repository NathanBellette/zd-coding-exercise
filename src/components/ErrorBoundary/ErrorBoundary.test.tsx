import React from 'react';
import {render, screen} from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('<ErrorBoundary />', () => {
    it('renders the component', () => {
        const container = render(<ErrorBoundary><p>Test</p></ErrorBoundary>);
        expect(container).toMatchSnapshot();
    });
})