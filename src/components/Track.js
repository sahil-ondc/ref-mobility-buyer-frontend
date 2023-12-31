import { Button, Grid } from '@mui/material';
import React from 'react';
import './Track.css';

const Track = ({ trackResult }) => (
  <Grid container paddingX={4} paddingY={5}>
    <Grid container className="track-with-border" display="flex">
      <Grid
        item
        xs={4}
        alignItems="center"
        justifyContent="left"
        display="flex"
        marginLeft={4}
      >
        <h3>Click to track your order</h3>
      </Grid>
      <Grid
        item
        xs={4}
        alignItems="center"
        justifyContent="left"
        display="flex"
        marginLeft={2}
        marginRight={2}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
          // eslint-disable-next-line react/destructuring-assignment
          href={trackResult[0].message.tracking.url}
          target="_blank"
        >
          Track Vehicle
        </Button>
      </Grid>
    </Grid>
  </Grid>
);

export default Track;
