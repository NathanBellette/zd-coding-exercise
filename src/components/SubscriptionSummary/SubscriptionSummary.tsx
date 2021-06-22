import React from 'react';
import styles from './SubscriptionSummary.module.scss';

export interface ComponentProps {
    title: string;
    children: JSX.Element[];
}

const SubscriptionSummary: React.FC<ComponentProps> = ({title, children}) => {
    return (
        <article className={styles.summary}>
            <h2>{title}</h2>
            {children}
        </article>
    )
};

export default SubscriptionSummary;