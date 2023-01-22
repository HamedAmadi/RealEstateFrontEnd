import './UserWidget.scss'
import {FC} from "react";
import {Link} from "react-router-dom";
import {useUserContext} from '../../context/UserContext';
import {useLogout} from '../../hooks/auth-hooks';

const UserWidget: FC = () => {
  const {state} = useUserContext()

  const logout = useLogout()

  return (
    <div className="user-widget my-auto">
      <div className="my-auto d-flex">
        {
          state.isSignIn ?
            <>
              <div className="mx-2 my-auto">{state.fullName}</div>
              <div className="my-auto">/</div>
              <div className="mx-2 my-auto" role="button" onClick={logout}>
                خروج
              </div>
            </>
            :
            <>
              <div className="mx-2 my-auto">
                <Link to='/sign-in'>
                  ورود
                </Link>
              </div>
              <div className="my-auto">/</div>
              <div className="mx-2 my-auto">
                <Link to='/sign-up'>
                  ثبت نام
                </Link>
              </div>
            </>
        }
      </div>
    </div>
  );
};

export default UserWidget;
