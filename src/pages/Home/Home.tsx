import './Home.scss'
import {FC, memo} from "react";
import {useGetAdvertises} from '../../hooks/advertise-hooks';
import Loading from '../../components/Loading/Loading';
import Card from '../../components/Card/Card';
import {Advertise} from '../AddAdvertise/AddAdvertise';
import {Link} from 'react-router-dom';

const Home: FC = () => {
  const {data: advertises, isLoading} = useGetAdvertises()

  if ( isLoading ) return <Loading />
  return (
    <div className="home pt-4">
      <div className="container">
        <h3 className='fw-bolder text-center'>آگهی های فروش</h3>
        <div className="row">
          {
            advertises.length !== 0 ?
              advertises.map( ( ad: Advertise ) => (
                <div key={ad.id} className="col-lg-4 col-md-6">
                  <Link to={`/advertise/${ad.id}`}>
                    <Card address={ad.address} />
                  </Link>
                </div>
              ) )
              :
              <p className="text-center">موردی وجود ندارد.</p>
          }
        </div>
      </div>
    </div>
  );
};

export default memo( Home );
