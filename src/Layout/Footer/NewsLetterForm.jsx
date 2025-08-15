import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ButtonComponent from '../../inputs/Button';

const SubscribeForm = () => {
    const initialValues = { email: '' };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Please complete this required field.'),
    });

    const handleSubmit = (values) => {
        alert(`Subscribed with: ${values.email}`);
        // Handle form submission logic here (API call, etc.)
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ touched, errors }) => (
                <Form className="max-w-sm mx-auto text-left">
                    <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <Field
                        name="email"
                        type="email"
                        className={`w-full p-2 border rounded-md focus:outline-none ${touched.email && errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    <ButtonComponent variant='primary' type="submit" className="mt-4 px-6 transition-colors" >
                        Subscribe
                    </ButtonComponent>
                </Form>
            )}
        </Formik>
    );
};

export default SubscribeForm;