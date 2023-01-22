import {ErrorMessage} from "@hookform/error-message";
import {forwardRef} from "react";
import {FieldErrorsImpl} from "react-hook-form";

type TextAreaProps = {
  name: string,
  label: string,
  errors?: FieldErrorsImpl
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>( ( {name, label, errors, ...rest}, ref ) => {
  return (
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
        <textarea className="text-input" ref={ref} name={name} {...rest} rows={5} />
      </div>
    </>
  );
} );

export default TextArea;
