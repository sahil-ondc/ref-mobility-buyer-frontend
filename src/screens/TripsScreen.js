/* eslint-disable consistent-return */
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';
import moment from 'moment';
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
        {trips ? (
          trips?.map((trip, index) => (
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
                <Typography sx={{ fontSize: '12px' }}>
                  {trip.vehicle}
                  <Typography
                    sx={{ color: 'text.secondary', fontSize: '12px' }}
                  >
                    {trip.transaction_id}
                  </Typography>
                </Typography>
              </AccordionSummary>
              {/* <Divider /> */}
              <AccordionDetails>
                <Grid container spacing={2} columns={16} rowSpacing={1}>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>
                      User Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {trip.user?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>
                      User Phone :
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {trip.user?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>
                      {' '}
                      Driver Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {trip.driver}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}> State :</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      Completed
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>
                      {' '}
                      Start Location:
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {trip?.location?.start?.location?.address?.door}
                      ,
                      {trip?.location?.start?.location?.address?.street}
                      ,
                      {trip?.location?.start?.location?.address?.locality}
                      ,
                      {trip?.location?.start?.location?.address?.city}
                      ,
                      {trip?.location?.start?.location?.address?.country}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>
                      {' '}
                      End Location :
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {' '}
                      {trip?.location?.end?.location?.address?.door}
                      ,
                      {trip?.location?.end?.location?.address?.street}
                      ,
                      {trip?.location?.end?.location?.address?.locality}
                      ,
                      {trip?.location?.end?.location?.address?.city}
                      ,
                      {trip?.location?.end?.location?.address?.country}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>
                      Transaction Id :
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {trip.transaction_id}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>
                      Fare
                      {' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    />
                  </Grid>
                  <hr style={{ width: '100%' }} />
                  {trip?.qoute?.breakup?.map((item) => (
                    <>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: '12px' }}>
                          {item?.title}
                          {' '}
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography
                          sx={{ color: 'text.secondary', fontSize: '12px' }}
                        >
                          {item?.price?.currency}
                          :
                          {item?.price?.value}
                        </Typography>
                      </Grid>
                    </>
                  ))}
                  <hr style={{ width: '100%' }} />
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>Total :</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {' '}
                      {`${trip?.qoute?.currency}    : `}
                      {trip?.qoute?.value}
                    </Typography>
                  </Grid>
                  <hr style={{ width: '100%' }} />
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>
                      {' '}
                      Order Id :
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {trip.order_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: '12px' }}>
                      Created On :
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '12px' }}
                    >
                      {moment(trip?.createdAt)
                        .utcOffset('+05:30')
                        .format('DD-MM-YYYY hh:mm A')}
                      {/* {trip.createdAt} */}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <h2> No Trips Found</h2>
        )}
      </div>
      <Footer />
    </div>
  );
}
