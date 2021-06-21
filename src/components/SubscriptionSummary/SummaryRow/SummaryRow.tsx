import React from 'react';
import cx from 'classnames';
import styles from './SummaryRow.module.scss';

export interface ComponentProps {
    label: string;
    value: string | number;
    updated?: boolean;
}

const SummaryRow: React.FC<ComponentProps> = ({ label, value, updated}) => {
    return (
        <div className={styles.row}>
            <p className={styles.label}>{label}</p>
            <p className={cx({
                [styles.value]: true,
                [styles.updated]: updated
            })}>{value}</p>
        </div>
    );
};

export default SummaryRow;
