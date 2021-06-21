import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {BeatLoader} from 'react-spinners';
import {Plan, Subscription} from '../../interfaces';
import TextField from '../../components/TextField/TextField';
import TextFieldDisplay from '../../components/TextFieldDisplay/TextFieldDisplay';
import Button from '../../components/Button/Button';
import styles from './SubscriptionPage.module.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {shouldEnableUpdate} from '../../common/helpers';

export interface ComponentProps {
    currentSubscription: Subscription | undefined;
    previewSubscription: Subscription | undefined;
    setPreviewSubscription: (subscription: Subscription) => void;
    setCurrentSubscription: (subscription: Subscription) => void;
}

const SubscriptionPage: React.FC<ComponentProps> = ({
                                                        currentSubscription,
                                                        previewSubscription,
                                                        setPreviewSubscription,
                                                        setCurrentSubscription}) => {
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        axios.get('/api/current/1')
            .then(response => {
                setLoading(false);
                console.log('current response: ', response.data.subscription);
                setCurrentSubscription(response.data.subscription);
                setPreviewSubscription(response.data.subscription);
            });
    }, []);

    const getSubscriptionPreview = (previewSubscription: Subscription) => {
        setLoading(true);
        axios.put('/api/preview/1', previewSubscription)
            .then(response => {
                setLoading(false);
                setPreviewSubscription(response.data);
            })
    };

    const handlePlanChange = (option: Plan | null) => {
        if(option == null) return;
        const selectedPlan = currentSubscription?.product.plans.find(p => p.id === option.id);

        if(previewSubscription && selectedPlan){
            getSubscriptionPreview({
                ...previewSubscription,
                plan: selectedPlan
            })
        }
    };

    const handleSeatsChange = (e: React.FormEvent<HTMLInputElement>) => {
        const numSeats = e.currentTarget.value;
        if(previewSubscription) {
            getSubscriptionPreview({
                ...previewSubscription,
                seats: Number(numSeats)
            });
        }
    };

    const handleUpdateClicked = () => {
        if(previewSubscription) {
            axios.post('/api/current/1', previewSubscription).then(response => {
                setPreviewSubscription(response.data.subscription);
            });
            history.push('/confirmation');
        }
    };

    if(loading) return <BeatLoader color="#000000" loading={loading} size={150} />

    const currencyFornatter = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });

    return (
        <section className={styles.subscription}>
            <article>
                <h2>Subscription</h2>
                <div className={styles.inputRow}>
                    <div className={styles.planSelect}>
                        <Select
                            options={previewSubscription?.product.plans}
                            value={previewSubscription?.plan}
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            onChange={handlePlanChange} />
                    </div>
                    <TextField id="numSeats" name="numSeats" label="Seats" value={previewSubscription?.seats?.toString()} onChange={handleSeatsChange} />
                    <TextFieldDisplay label="Price" value={currencyFornatter.format(previewSubscription?.cost || 0)} />
                </div>
                <div className={styles.buttonRow}>
                    <Button onClick={handleUpdateClicked} disabled={shouldEnableUpdate(previewSubscription, currentSubscription)}>Update Subscription</Button>
                </div>
            </article>
        </section>
    )
}

export default SubscriptionPage;