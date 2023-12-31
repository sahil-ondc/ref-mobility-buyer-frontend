import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import './Payment.css';
import { Button, FormControlLabel } from '@mui/material';
import Item from './Item';
import Panel from './Panel';

const CashPayment = ({ onPaymentSelect, selectedValue }) => (
  <Grid container className="payment-options" display="flex" paddingLeft={4}>
    <FormControlLabel
      value="Cash"
      className="form-control"
      control={(
        <Radio
          checked={selectedValue === 'Cash'}
          value="Cash"
          onChange={onPaymentSelect}
          name="radio-buttons"
          inputProps={{ 'aria-label': 'Cash' }}
        />
      )}
      label={(
        <div className="payment-label">
          <div className="payment-mode-icon">
            <img width="25px" height="25px" src="./cash.png" alt="cash" />
          </div>

          <p className="payment-mode-name cash-payment">Pay on Cash</p>
        </div>
      )}
    />

  </Grid>
);

const OnlinePayment = ({ onPaymentSelect, selectedValue }) => (
  <Grid container className="payment-options" display="flex" paddingLeft={4}>
    <FormControlLabel
      value="UPI"
      className="form-control"
      control={(
        <Radio
          checked={selectedValue === 'UPI'}
          value="UPI"
          onChange={onPaymentSelect}
          name="radio-buttons"
          inputProps={{ 'aria-label': 'UPI' }}
        />
      )}
      label={(

        <div className="payment-label">
          <div className="payment-mode-icon">
            <img height="14px" width="45px" src="./upi.png" alt="upi" />
          </div>

          <p className="payment-mode-name">Pay via UPI</p>
        </div>
      )}
    />

  </Grid>
);

const LoaderScreen = ({
  onConfirmPayment, initResults, onPaymentSelect, paymentMode, createTrip,
}) => (
  <div>
    <Item item={initResults[0]?.message?.order?.items[0]} />
    <div className="payment-info">
      Payment Method
    </div>
    <CashPayment onPaymentSelect={onPaymentSelect} selectedValue={paymentMode} />
    <OnlinePayment onPaymentSelect={onPaymentSelect} selectedValue={paymentMode} />
    <div className="book-now-button">
      <Button
        fullWidth
        variant="contained"
        disabled={!(paymentMode.length > 0)}
        onClick={() => {
          onConfirmPayment();
          createTrip();
        }}
      >
        Book Now
      </Button>
    </div>

  </div>
);

const Payment = ({ onConfirmPayment, initResults, createTrip }) => {
  const [openPanel, setOpenPanel] = useState(true);
  const toggleDrawer = () => {
    setOpenPanel(true);
  };
  const [paymentMode, setPaymentMode] = useState('');
  const onPaymentSelect = (event) => {
    setPaymentMode(event.target.value);
  };
  return (
    <Grid>
      <Panel
        isPullerPresent={false}
        panelChildren={(
          <LoaderScreen
            onConfirmPayment={onConfirmPayment}
            initResults={initResults}
            onPaymentSelect={onPaymentSelect}
            paymentMode={paymentMode}
            createTrip={createTrip}
          />
        )}
        open={openPanel}
        toggleDrawer={toggleDrawer}
        openDrawerHeight="428px"
        panelHeight="112%"
      />

    </Grid>
  );
};

export default Payment;
