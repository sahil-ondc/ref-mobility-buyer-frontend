import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './Footer.css';

const Footer = () => (
  <div className="footer">
    <Grid item>
      <Typography
        color="primary"
        paddingLeft={1}
        justifyContent="flex-end"
        align="center"
      >
        Open-source license
        <br />
        <b>Powered by ONDC Protocol</b>
      </Typography>
    </Grid>
  </div>
);

export default Footer;
