import React from 'react';
import styles from './NotFound.module.scss';
import {useHistory} from 'react-router-dom';
import Button from '../../components/Button/Button';

export interface ComponentProps {
    message?: string;
}

const NotFound: React.FC<ComponentProps> = ({message}) => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push('/');
    };

    return (
        <section className={styles.notFound}>
            <article className={styles.message}>
                {message ? <h1>{message}</h1> : <h1>Oops Page not found!</h1>}
                <div>
                    <Button onClick={handleButtonClick}>Go to home page</Button>
                </div>
            </article>
        </section>
    );
};

export default NotFound;