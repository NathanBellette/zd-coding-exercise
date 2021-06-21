import React from 'react';
import {render} from '@testing-library/react';
import SubscripionConfirmation, {ComponentProps} from './SubscripionConfirmation';
import {subscriptions} from '../../mocks/mockData';

describe('<SubscriptionConfirmation />', () => {
    const defaultProps: ComponentProps = {
        previousSubscription: subscriptions[0]
    };

    it('renders the component', () => {
        const container = render(<SubscripionConfirmation {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});