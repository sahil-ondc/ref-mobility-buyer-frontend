import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import './DateTime.css';
import { TextField } from '@mui/material';

const DateTime = ({ dateTime, onDateTimeChange, minDate }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDateTimePicker
      label="Date Time"
      inputFormat="DD/MM/YYYY hh:mm A"
      value={dateTime}
      onChange={onDateTimeChange}
      fullWidth
      className="date-picker"
      minDate={minDate}
      // eslint-disable-next-line react/jsx-props-no-spreading
      renderInput={(params) => <TextField {...params} />}
    />
  </LocalizationProvider>
);

export default DateTime;
