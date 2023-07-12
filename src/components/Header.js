import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SideDrawer from './SideDrawer';

const Header = ({ onBackClick }) => {
  const navigate = useHistory();
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
      {onBackClick && (
        <IconButton
          color="black"
          onClick={onBackClick}
          size="small"
        >
          <ArrowBackIosNewIcon fontSize="inherit" />
        </IconButton>
      )}

      <Grid
        marginLeft={2}
      >
        <Grid className="Drawer">
          <SideDrawer />
        </Grid>
      </Grid>
      <Grid
        item
        marginLeft="auto"
        marginRight={3}
        onClick={() => navigate.push('/')}
      >
        <img
          height={50}
          width={95}
          src="https://ondc-static-website-media.s3.ap-south-1.amazonaws.com/res/daea2fs3n/image/upload/ondc-website/image--6-/1665032253.png"
          alt="ONDC"
          style={{ cursor: 'pointer' }}
        />
      </Grid>
    </Grid>
  );
};
export default Header;
