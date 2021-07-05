import React from 'react';
import {Form, Formik, FormikProps} from "formik";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import styles from './ContactInformation.module.scss';
import {contactInformationValidation} from "./contactInformationValidation";

export interface ContactInformationFormValues {
    firstName: string;
    lastName: string;
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
}

const ConfirmationInformation: React.FC<{}> = () => {
    const handleSubmit = () => {
        console.log('Submitting');
    };

    const renderForm = (formikProps: FormikProps<ContactInformationFormValues>) => {
        return (
          <Form noValidate className={styles.formColumn}>
              <div className={styles.formRow}>
                  <TextField
                      id="firstName"
                      name="firstName"
                      type="text"
                      className={styles.firstName}
                      value={formikProps.values.firstName}
                      onChange={formikProps.handleChange}
                      maxLength={100}
                      label="First name"/>

                  <TextField
                      id="lastName"
                      name="lastName"
                      type="text"
                      className={styles.lastName}
                      value={formikProps.values.lastName}
                      onChange={formikProps.handleChange}
                      maxLength={100}
                      label="Last name"/>
              </div>

              <div className={styles.formRow}>
                  <TextField
                      id="streetAddress"
                      name="streetAddress"
                      type="text"
                      className={styles.streetAddress}
                      value={formikProps.values.streetAddress}
                      onChange={formikProps.handleChange}
                      maxLength={100}
                      label="Street address" />
              </div>

              <div className={styles.formRow}>
                  <TextField
                      id="suburb"
                      name="suburb"
                      type="text"
                      className={styles.suburb}
                      value={formikProps.values.suburb}
                      onChange={formikProps.handleChange}
                      maxLength={100}
                      label="Suburb" />

                  <TextField
                      id="postcode"
                      name="postcode"
                      type="text"
                      className={styles.postcode}
                      value={formikProps.values.postcode}
                      onChange={formikProps.handleChange}
                      maxLength={4}
                      label="Postcode" />
              </div>

              <Button onClick={formikProps.handleSubmit} disabled={formikProps.isSubmitting || !formikProps.isValid}>Submit</Button>
              <div className={styles.errors}>
                  {formikProps.errors.firstName && <p>{formikProps.errors.firstName}</p>}
                  {formikProps.errors.lastName && <p>{formikProps.errors.lastName}</p>}
                  {formikProps.errors.streetAddress && <p>{formikProps.errors.streetAddress}</p>}
                  {formikProps.errors.suburb && <p>{formikProps.errors.suburb}</p>}
                  {formikProps.errors.state && <p>{formikProps.errors.state}</p>}
                  {formikProps.errors.postcode && <p>{formikProps.errors.postcode}</p>}
              </div>

          </Form>
        );
    }

    return (
        <article className={styles.contactInformation}>
            <h2>Contact Information</h2>
            <div className={styles.formContainer}>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        streetAddress: '',
                        suburb: '',
                        state: '',
                        postcode: ''}}
                    onSubmit={handleSubmit}
                    validate={contactInformationValidation}
                    render={renderForm} />
            </div>
        </article>
    );
};

export default ConfirmationInformation;