import React from 'react';
import {render} from '@testing-library/react';
import SubscriptionPage, {ComponentProps} from './SubscriptionPage';
import {subscriptions} from '../../mocks/mockData';

describe('<SubscriptionPage />', () => {
   const defaultProps: ComponentProps = {
       currentSubscription: subscriptions[0],
       previewSubscription: { ...subscriptions[0] },
       setPreviewSubscription: jest.fn(),
       setCurrentSubscription: jest.fn()
   };

   it('renders the component', () => {
      const { container } = render(<SubscriptionPage {...defaultProps} />);
      expect(container).toMatchSnapshot();
   });
});