import React from 'react';
import styles from './TextFieldDisplay.module.scss';

export interface ComponentProps {
    label: string;
    value: string | number;
}

const TextFieldDisplay: React.FC<ComponentProps> = ({label, value}) => {
    return (
        <div className={styles.textDisplay}>
            <p className={styles.value}>{value}</p>
            <p className={styles.label}>{label}</p>
        </div>
    )
};

export default TextFieldDisplay;