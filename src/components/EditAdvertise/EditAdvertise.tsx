import './EditAdvertise.scss';
import {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useEditAdvertise, useGetAdvertise} from '../../hooks/advertise-hooks';
import Map from '../../components/Map/Map'
import Loading from '../Loading/Loading';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Advertise} from '../../pages/AddAdvertise/AddAdvertise';
import {toast} from 'react-hot-toast';

type Props = {
  toggleModal: () => void
}

const EditAdvertise: FC<Props> = ( {toggleModal} ) => {
  const {advertiseId} = useParams();
  const {data: advertise, isLoading: getLoading} = useGetAdvertise( advertiseId )
  const {mutate, isLoading: editLoading} = useEditAdvertise()
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<Advertise>();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();


  useEffect( () => {
    if ( advertise ) {
      setValue( "mobileNumber", advertise.mobileNumber )
      setValue( "address", advertise.address )
      setValue( "description", advertise.description )
      setLatitude( advertise.latitude )
      setLongitude( advertise.longitude )
    }
  }, [advertise] )

  const setMapLocation = ( latitude: number, longitude: number ) => {
    setLatitude( latitude )
    setLongitude( longitude )
  }

  const onSubmit: SubmitHandler<Advertise> = ( data ) => {
    const userId = localStorage.getItem( 'userId' )
    let id = Number( advertiseId )
    const values = {...data, latitude, longitude, userId, id}
    mutate( values, {
      onSuccess: () => {
        toggleModal()
        toast.success( 'آگهی با موفقیت ویرایش شد' )
      },
      onError: () => {
        toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
      }
    } )
  };

  if ( getLoading ) return <Loading />

  return (
    <div className="edit-advertise">
      <h4 className='text-center mt-3'>ویرایش</h4>
      <form onSubmit={handleSubmit( onSubmit )} noValidate>
        <div className='d-block fw-bold text-secondary mx-2 mb-1'>موقعیت</div>
        <div className="map-frame">
          <Map getMapLocation={setMapLocation} latitude={advertise.latitude} longitude={advertise.longitude} />
        </div>
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
        <div className="text-center mt-4">
          <button className='btn btn-primary' disabled={editLoading}>
            {editLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
            ثبت
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdvertise;
