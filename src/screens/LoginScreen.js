/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Footer from '../components/Footer';
import Api from '../api/Api';

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useHistory();
  const onSubmit = async (data) => {
    try {
      const res = await Api.post('/login', data);
      if (res.success) {
        const token = res?.data?.token;
        window.localStorage.setItem('token', token);
        navigate.push('/');
      }
    } catch (error) {
      return error;
    }
  };
  const handleSignup = () => {
    navigate.push('/signUp');
  };
  const onGoogleLogin = async (credentialResponse) => {
    const payload = {
      googleAccessToken: credentialResponse?.credential,
    };
    const res = await Api.post('/google-login', payload);
    if (res.success) {
      const token = res?.data?.token;
      window.localStorage.setItem('token', token);
      navigate.push('/');
    }
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#327B18' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
          >
            Log In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            />

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              {...register('password')}
            />

            <FormControlLabel
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
              Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              disableRipple
              style={{ marginBottom: '20px' }}
              onClick={handleSignup}
            >
              Signup
            </Button>
            <GoogleLogin
              style={{ margin: '20px' }}
              onSuccess={(credentialResponse) => {
                onGoogleLogin(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              // auto_select
              useOneTap
            />
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SignIn;
