import {ContactInformationFormValues} from "./ContactInformation";
import {FormikErrors} from "formik";


export const contactInformationValidation = (form: ContactInformationFormValues) : FormikErrors<ContactInformationFormValues> => {
    console.log('Form: ', form);
    const errors: FormikErrors<ContactInformationFormValues> = {};
    if(!form.firstName) {
        errors.firstName = 'First name must be provided';
    }

    if(!form.lastName) {
        errors.lastName = 'Last name must be provided';
    }

    if(!form.streetAddress) {
        errors.streetAddress = 'Street address must be provided';
    }

    if(!form.suburb) {
        errors.postcode = 'Postcode must be provided';
    }

    if(!form.state) {
        errors.state = 'State must be provided';
    }

    return errors;
};