import React, {useEffect, useState} from 'react';
import {useToasts} from 'react-toast-notifications';
import {Subscription} from '../../common/interfaces';
import styles from './LandingPage.module.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Loading from "../../components/Loading/Loading";
import {calculateSubscriptionCost} from '../../common/helpers';

export interface ComponentProps {
  allSubscriptions: Subscription[] | undefined;
  setAllSubscriptions: (subscriptions: Subscription[]) => void;
}

const LandingPage: React.FC<ComponentProps> = ({
                                                      allSubscriptions,
                                                      setAllSubscriptions
                                                    }) => {
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const {addToast}  = useToasts();

    useEffect(() => {
        setLoading(true)
        axios.get('/api/subscriptions')
            .then(response => {
                setLoading(false);
                setAllSubscriptions(response.data);
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

    return (
        <div className={styles.container}>
            <section className={styles.subscription}>
                <header>
                    <h2>Subscriptions</h2>
                </header>
                <article>
                    <Loading loading={loading} />
                    <div className={styles.inputRow}>
                      <div className={styles.total}>

                      </div>
                      <div className={styles.subscriptions}>

                      </div>
                    </div>
                </article>
            </section>
        </div>
    )
}

export default LandingPage;
