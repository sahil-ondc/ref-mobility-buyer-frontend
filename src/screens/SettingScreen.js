/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Avatar, Button, Snackbar,
} from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Api from '../api/Api';

const Settings = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  // eslint-disable-next-line consistent-return
  const fetchUserDetails = async () => {
    try {
      const response = await Api.authGet('/user-details', true);
      if (response.success) {
        setUserDetails(response?.data);
        setValue('name', response?.data?.name);
        setValue('phone', response?.data?.phone);
        setValue('email', response?.data?.email);
      }
    } catch (error) {
      return error.message ? error.message : error;
    }
  };
  React.useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = async (data) => {
    const payload = {
      userDetail: data,
    };
    try {
      const response = await Api.put('/user-details', payload, true);
      if (response.success) {
        setOpen(true);
      }
      return response;
    } catch (error) {
      return error.message ? error.message : error;
    }
  };
  return (
    <div>
      <Header />
      <Container
        component="main"
        maxWidth="xs"
      >
        <Box
          sx={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ height: 56, width: 56 }}
            src={userDetails?.avatar}
          />

          <Typography
            component="h1"
            variant="h5"
          >
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Name"
              {...register('name')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              {...register('email')}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Phone Number"
              id="phone"
              name="phone"
              autoComplete="phone"
              {...register('phone')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableRipple
              style={{ marginBottom: '20px' }}
            >
              Update
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          User Details Updated Successfuly !!!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Settings;
