import {ReactNode} from "react";
import Modal from "../Modal";


type Props = {
  isModalVisible: boolean
  onBackdropClick: () => void
  small: boolean
  children: ReactNode
}



const BaseModalWrapper: React.FC<Props> = ( {isModalVisible, onBackdropClick, small, children} ) => {

  if ( !isModalVisible ) {
    return null
  }

  return (
    <Modal onBackdropClick={onBackdropClick} small={small} >
      {children}
    </Modal>
  );
}

export default BaseModalWrapper