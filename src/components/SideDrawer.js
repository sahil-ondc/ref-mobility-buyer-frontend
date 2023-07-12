import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import CommuteIcon from '@mui/icons-material/Commute';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import './SideDrawer.css';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useHistory();
  const handleClick = (text) => {
    if (text === 'Dashboard') {
      navigate.push('/');
    }
    if (text === 'Trips') {
      navigate.push('/trips');
    }
    if (text === 'Settings') {
      navigate.push('/setting');
    }
    if (text === 'Log Out') {
      window.localStorage.clear();
      navigate.push('/login');
    }
  };

  const logoFinder = (text) => {
    if (text === 'Dashboard') {
      return <DashboardIcon />;
    }
    if (text === 'Trips') {
      return <CommuteIcon />;
    }
    if (text === 'Settings') {
      return <SettingsIcon />;
    }
    return <LogoutIcon />;
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        item
        marginLeft={2}
      >
        <img
          height={50}
          width={95}
          src="https://ondc-static-website-media.s3.ap-south-1.amazonaws.com/res/daea2fs3n/image/upload/ondc-website/image--6-/1665032253.png"
          alt="ONDC"
        />
      </Grid>
      <List>
        {['Dashboard', 'Trips', 'Settings'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              <ListItemIcon>
                {logoFinder(text)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List className="DrawerLogout">
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick('Log Out')}>
            <ListItemIcon>
              {logoFinder('Log Out')}
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
