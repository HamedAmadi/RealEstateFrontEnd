import './Card.scss'
import {FC} from "react";

type CardProps = {
  address: string
}

const Card: FC<CardProps> = ( {address} ) => {
  return (
    <div className="card my-2">
      <div className="card-body">
        <p>{address}</p>
      </div>
    </div >
  );
};

export default Card;
