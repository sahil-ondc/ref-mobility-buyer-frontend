/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, useState } from 'react';

const AppContext = createContext('defaultValue');

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <AppContext.Provider
      value={{
        setUserInfo,
        userInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const userContext = () => useContext(AppContext);

export { AppProvider, AppContext, userContext };
