/* eslint-disable consistent-return */
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';
import Header from '../components/Header';
import './Trips.css';
import Api from '../api/Api';
import Footer from '../components/Footer';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [trips, setTrips] = React.useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getTrips = async () => {
    try {
      const response = await Api.authGet('/all-trips', true);
      if (response.success) {
        setTrips(response?.data);
      }
    } catch (error) {
      return error.message ? error.message : error;
    }
  };
  React.useEffect(() => {
    getTrips();
  }, []);

  return (
    <div>
      <Header />
      <div className="Trip-wrapper">
        <h3>Trips Summary</h3>
        {trips
          ? (trips?.map((trip, index) => (
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
              key={trip?.transaction_id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '60%', flexShrink: 0 }}>
                  Transaction Id:
                  {trip.transaction_id}
                </Typography>
                <Typography sx={{ color: 'text.secondary', width: '30%' }}>Trip Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    Order Id:
                    <Typography sx={{ color: 'text.secondary' }}>{trip.order_id}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    Created At:
                    <Typography sx={{ color: 'text.secondary' }}>{trip.createdAt}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    Driver:
                    <Typography sx={{ color: 'text.secondary' }}>{trip.driver}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    Fair :
                    <Typography sx={{ color: 'text.secondary' }}>
                      {`${trip?.qoute?.currency}    : `}
                      {trip?.qoute?.value}

                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    Vehicle Type:
                    <Typography sx={{ color: 'text.secondary' }}>{trip.vehicle}</Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )))
          : (<h2> No Trips Found</h2>)}

      </div>
      <Footer />
    </div>
  );
}
