import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ onBackClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.localStorage.clear();
    navigate('/login');
  };

  return (
    <Grid
      container
      paddingLeft={1}
      paddingY={0.5}
      bgcolor="white"
      position="fixed"
      top={0}
      height="9vh"
      zIndex={99}
      alignItems="center"
      justify="space-between"
    >
      {onBackClick
    && (
    <IconButton color="black" onClick={onBackClick} size="small">
      <ArrowBackIosNewIcon fontSize="inherit" />
    </IconButton>
    )}

      <Grid item marginLeft={2}>
        <img
          height={50}
          width={95}
          src="https://ondc-static-website-media.s3.ap-south-1.amazonaws.com/res/daea2fs3n/image/upload/ondc-website/image--6-/1665032253.png"
          alt="ONDC"
        />
      </Grid>
      <Grid marginLeft="auto" marginRight={3}>

        <Grid>
          <LogoutIcon style={{ color: '#327B18', height: 30, width: 30 }} onClick={handleClick} />

        </Grid>

      </Grid>
    </Grid>
  );
};

export default Header;
