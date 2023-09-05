import * as Yup from 'yup';

const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

const SIGNUP_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]*$/, 'Name can only contain alphabets (a-z or A-Z).')
    .required('Name is required'),
  email: Yup.string()
    .required('Please enter the valid email ID')
    .trim()
    .email('Please enter the valid email ID')
    .matches(
      new RegExp(
        `^[a-zA-Z0-9._-]+@(${allowedDomains
          .map((domain) => domain.replace('.', '\\.'))
          .join('|')})$`,
      ),
      `Only specific domains are allowed (i.e ${allowedDomains.join(',')})`,
    ),
  phone: Yup.string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Password must contain at least 1 uppercase, 1 lowercase 1 numerical character and 1 special character',
    ),
});

export default SIGNUP_SCHEMA;
