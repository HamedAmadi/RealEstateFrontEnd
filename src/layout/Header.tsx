import './Header.scss'
import UserWidget from '../components/UserWidget/UserWidget'
import {FC, useContext} from 'react';
import {ThemeContext} from '../context/theme-context';
import {NavLink} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';




const Header: FC = () => {
  const {theme, setTheme} = useContext( ThemeContext );

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme( isCurrentDark ? 'light' : 'dark' );
    localStorage.setItem( 'default-theme', isCurrentDark ? 'light' : 'dark' );
  };
  return (
    <>
      <div className="header">
        <Toaster toastOptions={{
          className: 'toaster'
        }} />
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="d-flex my-2">
              <ul className="nav-list mb-0 pe-0 ps-2">
                <li className="nav-item"><NavLink to="/">خانه</NavLink></li>
                <li className="nav-item"><NavLink to="/add-advertise">ثبت آگهی</NavLink></li>
              </ul>
              <div className="toggle-btn-section">
                <div className={`toggle-checkbox m-vertical-auto`}>
                  <input
                    className="toggle-btn__input"
                    type="checkbox"
                    name="checkbox"
                    onChange={handleThemeChange}
                    checked={theme === 'light'}
                  />
                  <button type="button" className={`toggle-btn__input-label`} onClick={handleThemeChange}></button>
                </div>
              </div>
            </div>
            <UserWidget />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
