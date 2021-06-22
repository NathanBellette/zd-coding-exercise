import React, {useEffect, useState} from 'react';
import {Subscription} from '../../common/interfaces';
import SubscriptionSummary from '../SubscriptionSummary/SubscriptionSummary';
import SummaryRow from '../SummaryRow/SummaryRow';
import Button from '../Button/Button';
import styles from './SubscriptionConfirmation.module.scss';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {useToasts} from "react-toast-notifications";
import Loading from "../Loading/Loading";

export interface ComponentProps {
    previousSubscription: Subscription | undefined;
}

const SubscriptionConfirmation: React.FC<ComponentProps> = ({previousSubscription}) => {
    const [currentSubscription, setCurrentSubscription] = useState<Subscription>();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const {addToast}  = useToasts();

    useEffect(() => {
        setLoading(true);
        axios.get('/api/current/1')
            .then(response => {
                setLoading(false);
                setCurrentSubscription(response.data.subscription);
            })
            .catch(error => {
                setLoading(false);
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: false
                });
            })
            .finally(() => setLoading(false));
    }, []);

    const handleButtonClick = () => {
        history.goBack();
    };

    const planUpdated: boolean = previousSubscription?.plan.id !== currentSubscription?.plan.id;
    const seatsUpdated: boolean = previousSubscription?.seats !== currentSubscription?.seats;
    const priceUpdated: boolean = previousSubscription?.cost !== currentSubscription?.cost;

    return (
        <section>
            <Loading loading={loading} />
            <div className={styles.summaries}>
                <div className={styles.summariesColumn}>
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
                    <div className={styles.buttonRow}>
                        <Button disabled={false} onClick={handleButtonClick}>
                            Back
                        </Button>
                    </div>
                </div>
                <div className={styles.summariesColumn}>
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
            </div>
        </section>
    )
};

export default SubscriptionConfirmation;