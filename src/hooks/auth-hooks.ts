import {AxiosError} from "axios"
import {useMutation, useQuery} from "react-query"
import * as api from "../services/auth-apis"
import {SignUpForm} from "../pages/SignUp/SignUp"
import {SignInForm} from "../pages/SignIn/SignIn"
import {useUserContext} from "../context/UserContext"

export const useSignUp = () => {
  const {dispatch} = useUserContext()
  return useMutation<any, AxiosError, SignUpForm, unknown>(api.signUp, {
    onSuccess: ( res ) => {
      console.log(res)
      dispatch( {type: 'signIn', payload: true} )
      dispatch( {type: 'setFullName', payload: res.user.fullName} )
    }
  }   )
}

export const useSignIn = () => {
  const {dispatch} = useUserContext()
  return useMutation<any, AxiosError, SignInForm, unknown>(api.signIn, {
    onSuccess: ( res ) => {
      console.log(res)
      dispatch( {type: 'signIn', payload: true} )
      dispatch( {type: 'setFullName', payload: res.user.fullName} )
    }
  }  )
}

export const useCheckSignIn = ( id: string | null ) => {
  const {dispatch} = useUserContext()
  return useQuery(['user', id], () => api.checkSignIn( id ), {
    onSuccess: ( res ) => {
      dispatch( {type: 'signIn', payload: true} )
      dispatch( {type: 'setFullName', payload: res.fullName} )
    },
    onError: () => {
      dispatch({type: 'signOut'})
    }
  } )
}

export const useLogout = () => {
  const {dispatch} = useUserContext()
  return () => {
    dispatch( {type: 'signOut'} )
    localStorage.removeItem( 'token' )
    localStorage.removeItem( 'userId' )
  }
}