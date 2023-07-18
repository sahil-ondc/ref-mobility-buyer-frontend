/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {
  FormControl, FormLabel, Radio, RadioGroup,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Api from '../api/Api';

const MoreInfoScreen = () => {
  const { register, handleSubmit, setValue } = useForm();

  const navigate = useHistory();
  const onSubmit = async (data) => {
    const payload = {
      userDetail: data,
    };
    try {
      const res = await Api.put('/user-details', payload, true);
      if (res.success) {
        navigate.push('/');
      }
    } catch (error) {
      return error;
    }
  };
  const fetchUserDetails = async () => {
    try {
      const response = await Api.authGet('/user-details', true);
      if (response.success) {
        setValue('name', response?.data?.name);

        setValue('email', response?.data?.email);
      }
    } catch (error) {
      return error.message ? error.message : error;
    }
  };
  React.useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'green' }}>
          <InfoIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ margin: '20px' }}
        >
          More Details
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
                placeholder="First Name"
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
                placeholder="Email Address"
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
                autoComplete="phone"
                name="phone"
                required
                fullWidth
                id="phone"
                placeholder="Phone Number"
                {...register('phone')}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  {...register('gender')}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Procced to dashboard
          </Button>
        </form>
      </Box>
      <Footer />
    </Container>
  );
};

export default MoreInfoScreen;
