/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GooglePlacesApiLoader from './api/googlePlacesApiLoader';
import routes from './routes';
import PrivateLayout from './components/PrivateLayout';
import PublicLayout from './components/PublicLayout';

const libraries = ['places'];

const theme = createTheme({
  palette: {
    primary: {
      main: '#327B18',
    },
  },
});

export const CustomRoutes = ({
  restricted, component: Component, isLoaded, ...rest
}) => {
  const navigate = useHistory();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (restricted && !accessToken) navigate.push('/login');
    else if (!restricted && accessToken) {
      navigate.push('/');
    }
  }, [restricted]);

  return (
    <Route {...rest}>
      {restricted ? (
        <PrivateLayout>
          <Component isMapsLoaded={isLoaded} />
        </PrivateLayout>
      ) : (
        <PublicLayout>
          <Component />
        </PublicLayout>
      )}
    </Route>
  );
};
const App = () => {
  const { isLoaded } = GooglePlacesApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_KEY}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              {routes.map((route, index) => {
                const {
                  component, path, exact, restricted,
                } = route;
                return (
                  <Route
                    key={index}
                    path={path}
                    exact={exact}
                    render={() => (
                      <CustomRoutes
                        path={path}
                        exact={exact}
                        restricted={restricted}
                        component={component}
                        isLoaded={isLoaded}
                      />
                    )}
                  />
                );
              })}
              <Redirect to="/login" />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
