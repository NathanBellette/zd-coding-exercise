import React from 'react';
import styles from 'SummaryRow.module.scss';

export interface ComponentProps {
    label: string;
    value: string | number;
    updated?: boolean;
}

const SummaryRow: React.FC<ComponentProps> = ({ label, value}) => {
    return (
        <div className={styles.row}>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value}</p>
        </div>
    );
};

export default SummaryRow;
