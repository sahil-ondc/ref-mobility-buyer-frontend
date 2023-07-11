/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Button, CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Settings = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              {...register('name')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              autoFocus
              {...register('phone')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              style={{ marginBottom: '20px' }}
            />

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
            />

            <FormControlLabel
              style={{ marginBottom: '20px' }}
              control={(
                <Checkbox
                  value="Show Password"
                  color="primary"
                  onClick={handleClickShowPassword}
                />
                )}
              label="Show Password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableRipple
              style={{ marginBottom: '20px' }}
            >
              Reset
            </Button>
          </form>
        </Box>
      </Container>

      <Footer />

    </div>
  );
};

export default Settings;
