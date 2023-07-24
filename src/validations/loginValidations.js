import * as Yup from 'yup';

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .required('Please enter the valid email ID')
    .trim()
    .email('Please enter the valid email ID'),
  password: Yup.string().required('Password is required'),
});

export default VALIDATION_SCHEMA;
