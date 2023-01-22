import axios from "axios"
import {Advertise} from "../pages/AddAdvertise/AddAdvertise"

const client = axios.create( {baseURL: "http://localhost:3000"} )

export const addAdvertise = async ( _data: Advertise ) => {
  const token = localStorage.getItem( 'token' )
  const {data} = await client.post( '/644/Advertise', _data, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  } )
    return data
}

export const getAdvertises = async () => {
  const {data} = await client.get( '/644/Advertise' )
  return data
}

export const getAdvertise = async (id: string | undefined) => {
  const {data} = await client.get( `/644/Advertise/${id}` )
  return data
}

export const editAdvertise = async ( _data: Advertise ) => {
  const token = localStorage.getItem( 'token' )
  const {data} = await client.put( `/644/Advertise/${_data.id}`, _data, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  } )
  return data
}

export const deleteAdvertise = async ( id: number) => {
  const token = localStorage.getItem( 'token' )
  const {data} = await client.delete( `/664/Advertise/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  } )
  return data
}
