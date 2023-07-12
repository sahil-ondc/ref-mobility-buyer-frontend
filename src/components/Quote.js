/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@mui/material';
import './Quote.css';
import Provider from './Provider';
import InputField from './InputField';
import Item from './Item';
import PriceBreakdown from './PriceBreakdown';
import Api from '../api/Api';

const Quote = ({ bookingInformation, provider, onInitJourney }) => (
  <Grid container paddingX={4}>
    <Grid container paddingY={2}>
      {provider && <Provider provider={provider} />}
      <Grid item xs={11} display="flex" alignItems="center" paddingLeft={6}>
        <Typography variant="h6" gutterBottom>
          {bookingInformation[0]?.message?.order?.provider?.descriptor?.name}
        </Typography>
      </Grid>
    </Grid>
    <QuoteProvider
      bookingInformation={bookingInformation}
      onInitJourney={onInitJourney}
    />
  </Grid>
);

const QuoteProvider = ({ bookingInformation, onInitJourney }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const onSubmitUserDetails = () => {
    const userDetails = {
      name,
      email,
      phone: phoneNumber,
    };
    onInitJourney(userDetails);
  };
  const formatValue = (value) => value;
  const userDetails = async () => {
    try {
      const response = await Api.authGet('/user-details', true);
      if (response.success) {
        setName(response?.data?.name);
        setPhoneNumber(response?.data?.phone);
        setEmail(response?.data?.email);
      }
    } catch (error) {
      return error.message ? error.message : error;
    }
  };
  useEffect(() => {
    userDetails();
  }, []);
  return (
    <>
      <Item item={bookingInformation[0]?.message?.order?.items[0]} />
      <Grid
        sx={{
          maxWidth: '100%',
          minWidth: '50%',
          flexGrow: 1,
        }}
        paddingTop={2}
      >
        <Grid className="quote-fare-breakup" paddingBottom={2}>
          <PriceBreakdown
            quote={bookingInformation[0]?.message?.order?.quote}
          />
        </Grid>
      </Grid>
      <Grid
        sx={{
          maxWidth: '100%',
          flexGrow: 1,
          minWidth: '50%',
        }}
      >
        <Typography variant="h6" fontSize="1.2em" textAlign="center">
          User Details
        </Typography>
        <Grid className="quote-fare-breakup">
          <Grid marginBottom="2%">
            <InputField
              pattern="^[a-zA-Z ]+$"
              label="name"
              value={name}
              setValue={setName}
              formatValueFunc={formatValue}
              errorMessage="name should only contains alphabets and spaces"
              isPanelOpen
              marginBottom="2%"
            />
          </Grid>
          <Grid marginBottom="2%">
            <InputField
              pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]"
              label="email"
              value={email}
              setValue={setEmail}
              formatValueFunc={formatValue}
              errorMessage="invalid email address"
              isPanelOpen
              marginBottom="2%"
            />
          </Grid>
          <Grid marginBottom="2%">
            <InputField
              pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
              label="phone number"
              value={phoneNumber}
              setValue={setPhoneNumber}
              formatValueFunc={formatValue}
              errorMessage="invalid phone number"
              isPanelOpen
            />
          </Grid>
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        disabled={
          !(
            name.length > 0
            && email.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]')
            && phoneNumber.length === 10
          )
        }
        sx={{ my: 2 }}
        onClick={onSubmitUserDetails}
        data-testid="confirm"
      >
        Confirm
      </Button>
    </>
  );
};

export default Quote;
