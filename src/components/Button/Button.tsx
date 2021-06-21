import React from 'react';
import styles from './Button.module.scss';

export interface ComponentProps {
    children: string;
    disabled?: boolean;
    onClick: () => void;
}

const Button: React.FC<ComponentProps> = ({children, disabled, onClick}) =>
        <button className={styles.button} disabled={disabled} onClick={onClick}>{children}</button>;

export default Button;