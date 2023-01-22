import './Modal.scss'
import {MouseEventHandler, ReactNode, useState} from 'react';
import * as ReactDOM from 'react-dom';
import {ThemeContext} from '../../context/theme-context';


type ModalProps = {
  onBackdropClick: () => void
  small: boolean
  children: ReactNode
}



const stopPropagation: MouseEventHandler<HTMLDivElement> = e => {
  e.persist();
  e.stopPropagation();
};



const Modal: React.FC<ModalProps> = ( {onBackdropClick, small, children} ) => {

  const isBrowserDefaulDark = () => window.matchMedia( '(prefers-color-scheme: dark)' ).matches;

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem( 'default-theme' );
    const browserDefault = isBrowserDefaulDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState( getDefaultTheme() );

  return ReactDOM.createPortal(
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={`theme-${theme}`}>

        {small ?
          <div className="my-modal" onClick={onBackdropClick}>
            <div onClick={stopPropagation} className="my-modal-content2">
              {children}
            </div>
          </div>
          :
          <div className="my-modal" onClick={onBackdropClick}>
            <div onClick={stopPropagation} className="my-modal-content">
              {children}
            </div>
          </div>}
      </div>
    </ThemeContext.Provider>,
    document.getElementById( "modal" )!
  );
}

export default Modal