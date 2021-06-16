import React from 'react';
import {Subscription} from '../../interfaces';
import SubscriptionSummary from '../../components/SubscriptionSummary/SubscriptionSummary';
import SummaryRow from '../../components/SubscriptionSummary/SummaryRow/SummaryRow';


export interface ComponentProps {
    previousSubscription: Subscription;
    updatedSubscription: Subscription;
}

const SubscriptionConfirmation: React.FC<ComponentProps> = ({previousSubscription, updatedSubscription}) => {

    return (
        <section>
            <SubscriptionSummary title="Previous Subscription">
                <SummaryRow
                    label="Plan"
                    value={previousSubscription.name} />
                <SummaryRow
                    label="Seats"
                    value={previousSubscription.seats} />
                <SummaryRow
                    label="Price"
                    value={previousSubscription.cost} />
            </SubscriptionSummary>

            <SubscriptionSummary title="Updated Subscription">
                <SummaryRow
                    label="Plan"
                    updated={updatedSubscription.name.toLowerCase() !== previousSubscription.name.toLowerCase()}
                    value={updatedSubscription.name} />
                <SummaryRow
                    label="Seats"
                    updated={updatedSubscription.seats !== previousSubscription.seats}
                    value={updatedSubscription.seats} />
                <SummaryRow
                    label="Price"
                    updated={updatedSubscription.cost !== previousSubscription.cost}
                    value={updatedSubscription.cost} />
            </SubscriptionSummary>
        </section>
    )
};

export default SubscriptionConfirmation;