import LoginScreen from './screens/LoginScreen';
import SearchResult from './screens/SearchResult';
import SelectJourney from './screens/SelectJourney';
import InitScreen from './screens/InitScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import TrackScreen from './screens/TrackScreen';
import StatusScreen from './screens/StatusScreen';
import SignUpScreen from './screens/SignUpScreen';
import SearchScreen from './screens/SearchScreen';

export const SearchScreenRoute = {
  component: SearchScreen,
  path: '/',
  restricted: true,
  exact: true,
};
export const SearchResultRoute = {
  component: SearchResult,
  path: '/search',
  restricted: true,
  exact: true,
};
export const SelectJourneyRoute = {
  component: SelectJourney,
  path: '/select',
  restricted: true,
  exact: true,
};
export const InitScreenRoute = {
  component: InitScreen,
  path: '/init',
  restricted: true,
  exact: true,
};
export const ConfirmScreenRoute = {
  component: ConfirmScreen,
  path: '/confirm',
  restricted: true,
  exact: true,
};
export const TrackScreenRoute = {
  component: TrackScreen,
  path: '/track',
  restricted: true,
  exact: true,
};
export const StatusScreenRoute = {
  component: StatusScreen,
  path: '/track',
  restricted: true,
  exact: true,
};
export const LoginScreenRoute = {
  component: LoginScreen,
  path: '/login',
  restricted: true,
  exact: true,
};
export const SignUpScreenRoute = {
  component: SignUpScreen,
  path: '/signUp',
  restricted: true,
  exact: true,
};

const ROUTES = [];
export default ROUTES;
