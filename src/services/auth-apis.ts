import axios from "axios"
import {SignInForm} from "../pages/SignIn/SignIn"
import {SignUpForm} from "../pages/SignUp/SignUp"
const client = axios.create( {baseURL: "http://localhost:3000"} )

export const signUp = async ( _data: SignUpForm ) => {
  const {data} = await client.post( '/signup', _data )
    return data
}

export const signIn = async ( _data: SignInForm ) => {
  const {data} = await client.post( '/signin', _data )
    return data
}

export const checkSignIn = async ( id: string | null ) => {
  const token = localStorage.getItem('token')
  const {data} = await client.get( `/600/users/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  } )
  return data
}