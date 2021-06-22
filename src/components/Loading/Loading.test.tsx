import React from 'react';
import {render} from '@testing-library/react';
import Loading from './Loading';

describe('<ErrorBoundary />', () => {
    it('renders the component', () => {
        const container = render(<Loading />);
        expect(container).toMatchSnapshot();
    });
})