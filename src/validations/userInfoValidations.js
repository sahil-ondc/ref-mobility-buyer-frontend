import * as Yup from 'yup';

const USER_INFO_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Please enter the valid email ID')
    .trim()
    .email('Please enter the valid email ID'),
  phone: Yup.string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
});

export default USER_INFO_SCHEMA;
