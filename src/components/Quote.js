/* eslint-disable consistent-return */
import React, { useState } from 'react';
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
  const [otherUser, setOtherUser] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const onSubmitUserDetails = () => {
    const userDetails = {
      name,
      email,
      phone: phoneNumber,
    };
    onInitJourney(userDetails);
  };
  const handleOtherUser = () => {
    setOtherUser(!otherUser);
  };
  const formatValue = (value) => value;
  const userDetails = async () => {
    try {
      const response = await Api.authGet('/user-details', true);
      if (response.success) {
        setUserDetail(response?.data);
      }
    } catch (error) {
      return error.message ? error.message : error;
    }
  };

  React.useEffect(() => {
    userDetails();
  }, []);
  React.useEffect(() => {
    if (!otherUser && userDetail !== null) {
      setName(userDetail?.name);
      setPhoneNumber(userDetail?.phone);
      setEmail(userDetail?.email);
    } else if (otherUser) {
      setName('');
      setPhoneNumber('');
      setEmail('');
    }
  }, [userDetail, otherUser]);
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

      {otherUser && (
        <Grid
          sx={{
            maxWidth: '100%',
            flexGrow: 1,
            minWidth: '50%',
          }}
        >
          <Typography variant="h6" fontSize="1.2em" textAlign="center">
            Other User Details
          </Typography>
          <Grid className="quote-fare-breakup">
            <Grid marginBottom="2%">
              <InputField
                pattern="^[a-zA-Z][a-zA-Z ]*$"
                label="Name"
                value={name}
                setValue={setName}
                formatValueFunc={formatValue}
                errorMessage="Name should only contains alphabets"
                isPanelOpen
                marginBottom="2%"
              />
            </Grid>
            <Grid marginBottom="2%">
              <InputField
                pattern="^(?=.*@)(?=.*(gmail\.com|outlook\.com|yahoo\.com)$)[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]"
                label="Email id"
                value={email}
                setValue={setEmail}
                formatValueFunc={formatValue}
                errorMessage="Invalid email address"
                isPanelOpen
                marginBottom="2%"
              />
            </Grid>
            <Grid marginBottom="2%">
              <InputField
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
                label="Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
                formatValueFunc={formatValue}
                maxlength={10}
                errorMessage="Invalid phone number"
                isPanelOpen
              />
            </Grid>
          </Grid>
        </Grid>
      )}

      {otherUser ? (
        <Typography
          sx={{ marginLeft: '150px' }}
          align="right"
          onClick={handleOtherUser}
        >
          Booking for Yourself ?
        </Typography>
      ) : (
        <Typography
          sx={{ marginLeft: '150px' }}
          align="right"
          onClick={handleOtherUser}
        >
          Booking for someone ?
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        disabled={
          !(
            name.match('^[a-zA-Z][a-zA-Z ]*$')
            && email.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]')
            && phoneNumber.match(
              '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
            )
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
