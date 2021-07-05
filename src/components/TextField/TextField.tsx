import React from 'react';
import cx from 'classnames';
import styles from './TextField.module.scss';

export interface ComponentProps {
    id: string;
    className?: string;
    type: string;
    name: string;
    label: string;
    maxLength?:number;
    value: string | undefined;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<ComponentProps> = ({id, className, name, label, type, maxLength, value, onChange}) => {
    const inputClassName = cx([styles.input], className);
    return (
        <div className={styles.textField}>
            <input
                className={inputClassName}
                id={id} data-testid="text-input-field"
                type={type}
                maxLength={maxLength}
                name={name}
                value={value}
                onChange={onChange}
                aria-label="text-field" />
            <label className={styles.label} htmlFor={id}>{label}</label>
        </div>
    );
};

export default TextField;