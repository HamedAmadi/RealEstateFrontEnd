import './AddAdvertise.scss'
import {FC, memo, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "../../components/Input/Input";
import TextArea from "../../components/TextArea/TextArea";
import Map from '../../components/Map/Map'
import {useAddAdvertise} from '../../hooks/advertise-hooks';
import {toast} from 'react-hot-toast';

export type Advertise = {
  id?: number;
  mobileNumber: string,
  address: string,
  description: string,
  latitude?: number,
  longitude?: number,
}

const AddAdvertise: FC = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<Advertise>();
  const [latitude, setLatitude] = useState<number>( 0 );
  const [longitude, setLongitude] = useState<number>( 0 );
  const {mutate, isLoading} = useAddAdvertise()

  const setMapLocation = ( latitude: number, longitude: number ) => {
    setLatitude( latitude )
    setLongitude( longitude )
  }

  const onSubmit: SubmitHandler<Advertise> = ( data ) => {
    const userId = localStorage.getItem( 'userId' )
    const values = {...data, latitude, longitude, userId}
    mutate( values, {
      onSuccess: ( res ) => {
        reset()
        toast.success( 'آگهی با موفقیت ثبت شد' )
      },
      onError: ( error ) => {
        toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
      }
    } )
  };

  return (
    <div className="add-advertise">
      <div className="container">
        <h3 className='pt-5 fw-bolder text-center'>ثبت آگهی</h3>
        <form onSubmit={handleSubmit( onSubmit )} noValidate>
          <div className="row">
            <div className="col-lg-6">
              <div className="map-section">
                <div className='d-block fw-bold text-secondary mx-2 mb-1'>موقعیت</div>
                <div className="map-frame">
                  <Map getMapLocation={setMapLocation} latitude={latitude} longitude={longitude} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <Input
                errors={errors}
                {...register( "mobileNumber",
                  {
                    required: 'شماره موبایل را وارد کنید',
                    pattern: {
                      value: /^09-?[0-9]{9}$/,
                      message: 'شماره موبایل اشتباه وارد شده'
                    }
                  } )}
                type="text"
                label="شماره موبایل"
              />
              <TextArea
                errors={errors}
                {...register( "address", {
                  required: 'آدرس خود را وارد کنید'
                } )}
                name="address"
                label="آدرس"
              />
              <TextArea
                errors={errors}
                {...register( "description" )}
                name="description"
                label="توضیحات"
              />
            </div>
          </div>
          <div className="text-start mt-4">
            <button className='btn btn-primary' disabled={isLoading}>
              {isLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo( AddAdvertise );
