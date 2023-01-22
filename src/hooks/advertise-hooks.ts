import {AxiosError} from "axios"
import {useMutation, useQuery} from "react-query"
import * as api from "../services/advertise-apis"
import {Advertise} from "../pages/AddAdvertise/AddAdvertise"
import {queryClient} from ".."

export const useAddAdvertise = () => {
  return useMutation<any, AxiosError, Advertise, unknown>(api.addAdvertise )
}

export const useGetAdvertises = () => {
  return useQuery( ['advertises'], api.getAdvertises)
}

export const useGetAdvertise = ( id: string | undefined ) => {
  return useQuery( ['advertise', id], () => api.getAdvertise( id ))
}

export const useEditAdvertise = () => {
  return useMutation<any, AxiosError, Advertise, unknown>( api.editAdvertise, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['advertise'] )
    }
  } )
}

export const useDeleteAdvertise = () => {
  return useMutation( api.deleteAdvertise, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['advertises'] )
    }
  } )
}