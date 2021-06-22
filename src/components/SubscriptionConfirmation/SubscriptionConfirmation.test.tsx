import React from 'react';
import {render} from '@testing-library/react';
import SubscripionConfirmation, {ComponentProps} from './SubscripionConfirmation';
import {subscriptions} from '../../mocks/mockData';
import {ToastProvider} from "react-toast-notifications";

describe('<SubscriptionConfirmation />', () => {
    const defaultProps: ComponentProps = {
        previousSubscription: subscriptions[0]
    };

    it('renders the component', () => {
        const container = render(<ToastProvider><SubscripionConfirmation {...defaultProps} /></ToastProvider>);
        expect(container).toMatchSnapshot();
    });
})