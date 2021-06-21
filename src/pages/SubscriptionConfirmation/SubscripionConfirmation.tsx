import React, {useEffect, useState} from 'react';
import {Subscription} from '../../interfaces';
import SubscriptionSummary from '../../components/SubscriptionSummary/SubscriptionSummary';
import SummaryRow from '../../components/SubscriptionSummary/SummaryRow/SummaryRow';
import Button from '../../components/Button/Button';
import styles from './SubscriptionConfirmation.module.scss';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

export interface ComponentProps {
    previousSubscription: Subscription | undefined;
}

const SubscriptionConfirmation: React.FC<ComponentProps> = ({previousSubscription}) => {
    const [currentSubscription, setCurrentSubscription] = useState<Subscription>();
    const history = useHistory();

    useEffect(() => {
        axios.get('/api/current/1')
            .then(response => {
                console.log('current response: ', response.data.subscription);
                setCurrentSubscription(response.data.subscription);
            });
    }, []);

    const handleButtonClick = () => {
        history.goBack();
    };

    const planUpdated: boolean = previousSubscription?.plan.id !== currentSubscription?.plan.id;
    const seatsUpdated: boolean = previousSubscription?.seats !== currentSubscription?.seats;
    const priceUpdated: boolean = previousSubscription?.cost !== currentSubscription?.cost;

    return (
        <section>
            <div className={styles.summaries}>
                <div className={styles.summariesRow}>
                    <SubscriptionSummary title="Previous Subscription">
                        <SummaryRow
                            label="Plan"
                            updated={planUpdated}
                            value={previousSubscription?.plan.name || ''} />
                        <SummaryRow
                            label="Seats"
                            updated={seatsUpdated}
                            value={previousSubscription?.seats || 0} />
                        <SummaryRow
                            label="Price"
                            updated={priceUpdated}
                            value={previousSubscription?.cost || 0} />
                    </SubscriptionSummary>

                    <SubscriptionSummary title="Updated Subscription">
                        <SummaryRow
                            label="Plan"
                            updated={planUpdated}
                            value={currentSubscription?.plan.name || ''} />
                        <SummaryRow
                            label="Seats"
                            updated={seatsUpdated}
                            value={currentSubscription?.seats || 0} />
                        <SummaryRow
                            label="Price"
                            updated={priceUpdated}
                            value={currentSubscription?.cost || 0} />
                    </SubscriptionSummary>
                </div>
                <div className={styles.buttonRow}>
                    <Button disabled={false} onClick={handleButtonClick}>
                        Back
                    </Button>
                </div>
            </div>
        </section>
    )
};

export default SubscriptionConfirmation;