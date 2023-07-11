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
import Footer from '../components/Footer';
import Api from '../api/Api';

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { register, handleSubmit } = useForm();

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
        <Avatar sx={{ m: 1, bgcolor: 'green' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                {...register('name')}
                autoFocus
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register('email')}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
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
            </Grid>
            <Grid
              item
              xs={12}
            >
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
        <Grid
          container
          justifyContent="flex-end"
        >
          <Grid item>
            <Link
              href="/login"
              variant="body2"
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
