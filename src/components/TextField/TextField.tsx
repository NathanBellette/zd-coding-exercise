import React from 'react';
import styles from './TextField.module.scss';

export interface ComponentProps {
    id: string;
    name: string;
    label: string;
    value: string | undefined;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<ComponentProps> = ({id, name, label, value, onChange}) => {
    return (
        <div className={styles.textField}>
            <input className={styles.input} id={id} data-testid="text-input-field" name={name} value={value} onChange={onChange} aria-label="text-field" />
            <label className={styles.label} htmlFor={id}>{label}</label>
        </div>
    );
};

export default TextField;