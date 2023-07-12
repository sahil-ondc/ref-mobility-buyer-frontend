/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Button, CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Api from '../api/Api';

const Settings = () => {
  const { register, handleSubmit, setValue } = useForm();

  // eslint-disable-next-line consistent-return
  const fetchUserDetails = async () => {
    try {
      const response = await Api.authGet('/user-details', true);
      if (response.success) {
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

  const onSubmit = async () => {
  };
  return (
    <div>
      <Header />
      <Container
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ height: 56, width: 56 }} />

          <Typography
            component="h1"
            variant="h5"
          >
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {/*
            <TextField
              required
              fullWidth
              name="currentPassword"
              label="currentPassword"
              type={showPassword ? 'text' : 'password'}
              id="currentPassword"
              autoComplete="currentPassword"
              {...register('currentPassword')}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              required
              fullWidth
              name="newPassword"
              label="NewPassword"
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              autoComplete="newPassword"
              {...register('newPassword')}
              style={{ marginBottom: '20px' }}
            /> */}

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
    </div>
  );
};

export default Settings;
