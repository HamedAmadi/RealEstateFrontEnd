import './Advertise.scss';
import {FC, useState} from 'react';
import Map from '../../components/Map/Map'
import {useNavigate, useParams} from 'react-router-dom';
import {useDeleteAdvertise, useGetAdvertise} from '../../hooks/advertise-hooks';
import Loading from '../../components/Loading/Loading';
import BaseModalWrapper from '../../components/Modal/BaseModalWrapper/BaseModalWrapper';
import EditAdvertise from '../../components/EditAdvertise/EditAdvertise';
import {toast} from 'react-hot-toast';

const Advertise: FC = () => {
  const {advertiseId} = useParams();
  const navigate = useNavigate()
  const {data: advertise, isLoading} = useGetAdvertise( advertiseId )
  const {mutate: delAdvertise, isLoading: deleteAdvertiseLoading} = useDeleteAdvertise()
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>( false )
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>( false )

  const toggleEditModal = () => {
    setIsEditModalVisible( isModalVisible => !isModalVisible )
  }

  const toggleConfirmModal = () => {
    setIsConfirmModalVisible( isModalVisible => !isModalVisible )
  }

  const deleteAdvertise = ( id: number ) => {
    delAdvertise( id, {
      onSuccess: () => {
        navigate( '/' )
        toast.success( 'آگهی با موفقیت حذف شد' )
      },
      onError: () => {
        toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
      }
    } )
  }

  if ( isLoading ) return <Loading />

  return (
    <div className="advertise pt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h6 className="title">موقعیت</h6>
            <div className="map-frame">
              {advertise.latitude ?
                <Map latitude={advertise.latitude} longitude={advertise.longitude} />
                :
                <p>موقعیت وجود ندارد</p>
              }
            </div>
          </div>
          <div className="col-lg-6">
            {advertise.mobileNumber ?
              <>
                <h6 className="title">شماره موبایل</h6>
                <p className='mobile'>{advertise.mobileNumber}</p>
              </>
              :
              null
            }
            {
              advertise.address ?
                <>
                  <h6 className="title">آدرس</h6>
                  <p className='address'>{advertise.address}</p>
                </>
                :
                null
            }
            {
              advertise.description ?
                <>
                  <h6 className="title">توضیحات</h6>
                  <div className="description">
                    {advertise.description.split( '\n' ).map( ( line: string, i: number ) => <p key={i} className='mb-1'>{line}</p> )}

                  </div>
                </>
                :
                null
            }
          </div>
        </div>
        {
          advertise.userId === localStorage.getItem( 'userId' ) &&
          <div className="d-flex justify-content-end mt-3">
            <button className='btn btn-primary' onClick={toggleEditModal}>ویرایش</button>
            <button className='btn btn-danger me-3' onClick={toggleConfirmModal}>حذف</button>
          </div>
        }
      </div>
      <BaseModalWrapper isModalVisible={isEditModalVisible} onBackdropClick={toggleEditModal} small={false}>
        <EditAdvertise toggleModal={toggleEditModal} />
      </BaseModalWrapper>
      <BaseModalWrapper isModalVisible={isConfirmModalVisible} onBackdropClick={toggleConfirmModal} small={true}>
        <div className="text-center">
          <p>آیا از حذف آگهی مطمئن هستید؟</p>
          <div className="d-flex justify-content-around">
            <button className='btn btn-sm btn-primary' onClick={() => deleteAdvertise( Number( advertiseId ) )} disabled={deleteAdvertiseLoading}>
              {deleteAdvertiseLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
              بلی
            </button>
            <button className='btn btn-sm btn-danger' onClick={toggleConfirmModal}>خیر</button>
          </div>
        </div>

      </BaseModalWrapper>
    </div >
  );
};

export default Advertise;
