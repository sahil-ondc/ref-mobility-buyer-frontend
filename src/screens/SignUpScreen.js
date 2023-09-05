/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import SIGNUP_SCHEMA from '../validations/signUpValidations';
import Footer from '../components/Footer';
import Api from '../api/Api';
import './SignupScreen.css';

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(SIGNUP_SCHEMA),
  });

  const navigate = useHistory();
  const onSubmit = async (data) => {
    try {
      const res = await Api.post('/sign-up', data);
      if (res.success) {
        const token = res?.data?.token;
        window.localStorage.setItem('token', token);
        navigate.push('/');
      }
    } catch (error) {
      return error;
    }
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: 'green' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="signup-wrapper">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                error={errors?.name}
                fullWidth
                id="firstName"
                label="Name"
                {...register('name')}
                autoFocus
              />
              {errors?.name && (
                <Typography
                  variant="caption"
                  display="block"
                  color="#d32f2f"
                  gutterBottom
                >
                  {errors?.name?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors?.email}
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="phone"
                error={errors?.phone}
                fullWidth
                id="phone"
                label="Phone Number"
                inputProps={{ maxLength: 10 }}
                {...register('phone')}
              />
              {errors?.phone && (
                <Typography
                  variant="caption"
                  display="block"
                  color="#d32f2f"
                  gutterBottom
                >
                  {errors?.phone?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors?.password}
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Grid item>
            <Link
              href="/login"
              variant="body2"
              sx={{ textDecoration: 'none', color: '#B8B2A6' }}
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
};

export default SignUpScreen;
