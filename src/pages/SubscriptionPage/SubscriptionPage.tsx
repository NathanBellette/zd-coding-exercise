import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useToasts} from 'react-toast-notifications';
import {Plan, Subscription} from '../../common/interfaces';
import TextField from '../../components/TextField/TextField';
import TextFieldDisplay from '../../components/TextFieldDisplay/TextFieldDisplay';
import Button from '../../components/Button/Button';
import styles from './SubscriptionPage.module.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {isPlanUnchanged} from '../../common/helpers';
import Loading from "../../components/Loading/Loading";
import {INVALID_SEATS_ERROR_MESSAGE} from "../../common/constants";
import {useSubscription} from "../../context/SubscriptionContext";

export interface ComponentProps {
    currentSubscription: Subscription | undefined;
    previewSubscription: Subscription | undefined;
    setPreviewSubscription: (subscription: Subscription) => void;
    setCurrentSubscription: (subscription: Subscription) => void;
}

const hasValues = (obj: any) => obj &&  Object.values(obj).some(v => v !== null)

const SubscriptionPage: React.FC<ComponentProps> = ({
                                                        currentSubscription,
                                                        previewSubscription,
                                                        setPreviewSubscription,
                                                        setCurrentSubscription}) => {
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const {addToast}  = useToasts();
    const { currencies } = useSubscription();

    console.log('currencies: ', currencies);

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
            .catch(error => {
                setLoading(false);
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: false
                });
            })
            .finally(() => setLoading(false));
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

        const maxPlanSeats = previewSubscription?.product?.seats;
        const isSeatsValid = maxPlanSeats && Number(numSeats) < maxPlanSeats;
        if(!isSeatsValid) {
            addToast(INVALID_SEATS_ERROR_MESSAGE, {
                appearance: 'warning',
                autoDismiss: true
            });
            setErrors({
                ...errors,
                seats: INVALID_SEATS_ERROR_MESSAGE
            });
        } else {
            setErrors({
                ...errors,
                seats: null
            })
        }

        if(previewSubscription) {
            getSubscriptionPreview({
                ...previewSubscription,
                seats: Number(numSeats)
            });
        }
    };

    const handleUpdateClicked = () => {
        if(previewSubscription) {
            setLoading(true);
            axios.post('/api/current/1', previewSubscription).then(response => {
                setLoading(false);
                setPreviewSubscription(response.data.subscription);
            })
            .catch(error => {
                setLoading(false);
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true
                });
            })
            .finally(() => setLoading(false));
            history.push('/confirmation');
        }
    };

    const currencyFornatter = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });

    const disabledUpdate = hasValues(errors) || isPlanUnchanged(previewSubscription, currentSubscription);

    console.log('errors: ', errors);
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
                        <TextField
                            id="numSeats"
                            name="numSeats"
                            type="text"
                            label="Seats"
                            maxLength={4}
                            value={previewSubscription?.seats?.toString()}
                            onChange={handleSeatsChange} />
                        <TextFieldDisplay label="Price" value={currencyFornatter.format(previewSubscription?.cost || 0)} />
                    </div>
                </article>
                <div className={styles.buttonRow}>
                    <Button onClick={handleUpdateClicked} disabled={disabledUpdate}>Update Subscription</Button>
                </div>
            </section>
        </div>
    )
}

export default SubscriptionPage;