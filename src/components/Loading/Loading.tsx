import {FC} from 'react'
import './Loading.scss'

const Loading: FC = () => {
  return (
    <div className="w-100 text-center">
      <div className="my-spinner spinner-border mt-5" role="status"></div>
    </div>
  )
}

export default Loading
