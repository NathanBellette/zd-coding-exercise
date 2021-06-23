import React from 'react';
import {render, screen} from '@testing-library/react';
import SubscriptionPage, {ComponentProps} from './SubscriptionPage';
import {products} from '../../mocks/mockData';
import {ToastProvider} from "react-toast-notifications";
import {Subscription} from "../../common/interfaces";

describe('<SubscriptionPage />', () => {
    const currentSubscription: Subscription = {
        id: '1',
        product: products[0],
        plan: {
            id: '1',
            name: 'Basic',
            cost: 1
        },
        seats: 5,
        cost: 5
    }
   const defaultProps: ComponentProps = {
       currentSubscription,
       previewSubscription: { ...currentSubscription },
       setPreviewSubscription: jest.fn(),
       setCurrentSubscription: jest.fn()
   };

   it('renders the component', () => {
       const { container } = render(<ToastProvider><SubscriptionPage {...defaultProps} /></ToastProvider>);
       expect(container).toMatchSnapshot();
   });
})