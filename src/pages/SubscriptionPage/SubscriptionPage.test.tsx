import React from 'react';
import {render} from '@testing-library/react';
import SubscriptionPage, {ComponentProps} from './SubscriptionPage';
import {subscriptions} from '../../mocks/mockData';
import {ToastProvider} from "react-toast-notifications";

describe('<SubscriptionPage />', () => {
   const defaultProps: ComponentProps = {
       currentSubscription: subscriptions[0],
       previewSubscription: { ...subscriptions[0] },
       setPreviewSubscription: jest.fn(),
       setCurrentSubscription: jest.fn()
   };

   it('renders the component', () => {
       const { container } = render(<ToastProvider><SubscriptionPage {...defaultProps} /></ToastProvider>);
      expect(container).toMatchSnapshot();
   });
})