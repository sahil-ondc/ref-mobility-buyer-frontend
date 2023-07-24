/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Alert, Snackbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../components/Footer';
import Api from '../api/Api';
import { AppContext } from '../context/userContext';
import VALIDATION_SCHEMA from '../validations/loginValidations';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA),
  });
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useHistory();
  const handleClose = () => {
    setOpen(false);
  };
  const { setUserInfo } = useContext(AppContext);

  const onSubmit = async (data) => {
    try {
      const res = await Api.post('/login', data);

      if (res.success) {
        const token = res?.data?.token;
        window.localStorage.setItem('token', token);
        navigate.push('/');
      } else setOpen(true);
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
      setUserInfo(res?.data);
      if (res?.data?.user?.phone) {
        navigate.push('/');
      } else {
        navigate.push('/onboarding');
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <TextField
                error={errors.email}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register('email')}
              />
              {errors?.email && (
                <Typography
                  variant="caption"
                  display="block"
                  color="#d32f2f"
                  gutterBottom
                >
                  {errors?.email?.message}
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                error={errors.password}
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                {...register('password')}
              />
              {errors?.password && (
                <Typography
                  variant="caption"
                  display="block"
                  color="#d32f2f"
                  gutterBottom
                >
                  {errors?.password?.message}
                </Typography>
              )}
            </Box>

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
              width="355px"
              onSuccess={(credentialResponse) => {
                onGoogleLogin(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </form>
        </Box>
      </Container>

      <Footer />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Invalid credentials!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignIn;
