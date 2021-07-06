import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useToasts} from 'react-toast-notifications';
import {Plan, Subscription} from '../../common/interfaces';
import TextField from '../../components/TextField/TextField';
import TextFieldDisplay from '../../components/TextFieldDisplay/TextFieldDisplay';
import Button from '../../components/Button/Button';
import styles from './SubscriptionPage.module.scss';
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';
import {shouldDisableUpdate} from '../../common/helpers';
import Loading from "../../components/Loading/Loading";

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
    type Params = {
      id: string;
    };
    const {id} = useParams<Params>();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const {addToast}  = useToasts();

    useEffect(() => {
        setLoading(true)
        axios.get('/api/current/1')
            .then(response => {
                setLoading(false);
                setCurrentSubscription(response.data.subscription);
                setPreviewSubscription(response.data.subscription);
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

    const currencyFornatter = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });

    return (
        <div className={styles.container}>
            <section className={styles.subscription}>
                <header>
                    <h2>Subscription</h2>
                </header>
                <article>
                    <Loading loading={loading} />
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
                </article>
                <div className={styles.buttonRow}>
                    <Button onClick={handleUpdateClicked} disabled={shouldDisableUpdate(previewSubscription, currentSubscription)}>Update Subscription</Button>
                </div>
            </section>
        </div>
    )
}

export default SubscriptionPage;
