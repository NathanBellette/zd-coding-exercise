import React from 'react';
import {Form, Formik, FormikProps} from "formik";
import Button from "../../components/Button/Button";
import styles from './PaymentInformation.module.scss';
import TextField from "../../components/TextField/TextField";

interface FormValues {
    cardHolder: string;
    cardNumber: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
    cardCvvNumber: string;
}

const PaymentInformation: React.FC<{}> = () => {
    const handleSubmit = () => {
      console.log('Submitting');
    };

    const renderForm = (formikProps: FormikProps<FormValues>) => {
        return (
            <Form noValidate className={styles.formColumn}>
                <div className={styles.formRow}>
                    <TextField
                        id="cardHolder"
                        name="cardHolder"
                        type="text"
                        className={styles.cardHolder}
                        value={formikProps.values.cardHolder}
                        onChange={formikProps.handleChange}
                        maxLength={200}
                        label="Card Holder"/>
                </div>

                <div className={styles.formRow}>
                    <TextField
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        className={styles.cardNumber}
                        value={formikProps.values.cardNumber}
                        onChange={formikProps.handleChange}
                        maxLength={16}
                        label="Card Number"/>
                </div>

                <div className={styles.formRow}>
                    <TextField
                        id="cardExpiryMonth"
                        name="cardExpiryMonth"
                        type="text"
                        className={styles.cardExpiryMonth}
                        value={formikProps.values.cardExpiryMonth}
                        onChange={formikProps.handleChange}
                        maxLength={2}
                        label="Month" />

                    <TextField
                        id="cardExpiryYear"
                        name="cardExpiryYear"
                        type="text"
                        className={styles.cardExpiryYear}
                        value={formikProps.values.cardExpiryYear}
                        onChange={formikProps.handleChange}
                        maxLength={4}
                        label="Year" />
                </div>

                <div className={styles.formRow}>
                    <TextField
                        id="cardCvvNumber"
                        name="cardCvvNumber"
                        type="text"
                        className={styles.cardCvvNumber}
                        value={formikProps.values.cardCvvNumber}
                        onChange={formikProps.handleChange}
                        maxLength={3}
                        label="CVV" />
                </div>
                <Button onClick={formikProps.handleSubmit} disabled={formikProps.isSubmitting || !formikProps.isValid}>Submit</Button>

            </Form>
        )
    }

    return (
      <article className={styles.paymentInformation}>
          <h2>Payment Information</h2>
          <div className={styles.formContainer}>
              <Formik
                initialValues={{
                    cardHolder: '',
                    cardNumber: '',
                    cardExpiryMonth: '',
                    cardExpiryYear: '',
                    cardCvvNumber: ''}}
                onSubmit={handleSubmit}
                render={renderForm} />
          </div>
      </article>
    );
};

export default PaymentInformation;