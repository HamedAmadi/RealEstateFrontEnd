import {FC} from "react";
import {Navigate, Outlet} from 'react-router-dom'
import Loading from "../components/Loading/Loading";
import {useUserContext} from "../context/UserContext";

const PrivateRoutes: FC = () => {
  const {state} = useUserContext()
  if ( state.isSignIn === null ) return <Loading />

  return (
    state.isSignIn ? <Outlet /> : <Navigate to='/sign-in' />
  );
};

export default PrivateRoutes;
