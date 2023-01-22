import './App.scss';
import "bootstrap/scss/bootstrap.scss";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {ThemeContext} from './context/theme-context';
import Layout from './layout/Layout';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import {useState} from 'react';
import SignIn from './pages/SignIn/SignIn';
import AddAdvertise from './pages/AddAdvertise/AddAdvertise';
import Advertise from './pages/Advertise/Advertise';
import {useCheckSignIn} from './hooks/auth-hooks';
import PrivateRoutes from './util/PrivateRoutes';

const App = () => {
  useCheckSignIn( localStorage.getItem( 'userId' ) )

  const isBrowserDefaulDark = () => window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem( 'default-theme' );
    const browserDefault = isBrowserDefaulDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState( getDefaultTheme() );

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={`theme-${theme}`}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/advertise/:advertiseId' element={<Advertise />} />
              <Route element={<PrivateRoutes />}>
                <Route path='/add-advertise' element={<AddAdvertise />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
