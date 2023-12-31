import SwapVertIcon from '@mui/icons-material/SwapVert';
import { IconButton } from '@mui/material';
import React from 'react';
import './SwapButton.css';

const SwapeButton = ({ onSwapLocation }) => (
  <IconButton color="#327B18" className="searchScreen-swapIconButton" onClick={onSwapLocation} sx={{ py: 0 }}>
    <SwapVertIcon className="searchScreen-swapIcon" fontSize="35px" color="#327B18" />
  </IconButton>
);

export default SwapeButton;
