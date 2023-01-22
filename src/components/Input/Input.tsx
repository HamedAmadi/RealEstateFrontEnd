import './Input.scss'
import {forwardRef} from "react";
import {FieldErrorsImpl} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';

type InputProps = {
  type: string
  name: string
  label: string
  notice?: string
  errors?: FieldErrorsImpl
}

const Input = forwardRef<HTMLInputElement, InputProps>( ( {type, errors, name, label, notice, ...rest}, ref ) => {
  switch ( type ) {
    case 'text': return (
      <>
        <div className='input-wrapper'>
          <div className="d-flex justify-content-between">
            <label className="d-block fw-bold text-secondary mx-2 mb-1">{label}</label>
            <ErrorMessage
              errors={errors}
              name={name}
              render={( messages ) => {
                return (
                  <p className="error-message my-auto mx-0">{messages.message}</p>
                )
              }}
            />
          </div>
          <input className="text-input" ref={ref} type={'text'} name={name} {...rest} />
        </div>
      </>
    );
    case 'email': return (
      <>
        <div className='input-wrapper'>
          <div className="d-flex justify-content-between">
            <label className="d-block fw-bold text-secondary mx-2 mb-1">{label}</label>
            <ErrorMessage
              errors={errors}
              name={name}
              render={( messages ) => {
                return (
                  <p className="error-message my-auto mx-0">{messages.message}</p>
                )
              }}
            />
          </div>
          <input className="text-input" ref={ref} type={'email'} name={name} {...rest} />
          {notice && <span className='notice'>{notice}</span>}
        </div>
      </>
    )
    case 'password': return (
      <>
        <div className='input-wrapper'>
          <div className="d-flex justify-content-between">
            <label className="d-block fw-bold text-secondary mx-2 mb-1">{label}</label>
            <ErrorMessage
              errors={errors}
              name={name}
              render={( messages ) => {
                return (
                  <p className="error-message my-auto mx-0">{messages.message}</p>
                )
              }}
            />
          </div>
          <input className="text-input" ref={ref} type={'password'} name={name} {...rest} />
          {notice && <span className='notice'>{notice}</span>}
        </div>
      </>
    )
    default: return null
  }

} )

export default Input;
