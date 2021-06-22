import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

export interface ComponentProps {
    children: string;
    disabled?: boolean;
    onClick: () => void;
}

const Button: React.FC<ComponentProps> = ({children, disabled, onClick}) => {
    return (
        <button className={cx({
            [styles.button]: true,
            [styles.disabled]: disabled
        })} disabled={disabled} onClick={onClick}>{children}</button>
    );
};

export default Button;