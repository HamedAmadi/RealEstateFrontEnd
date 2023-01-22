import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/Input/Input";
import {useSignIn} from "../../hooks/auth-hooks";

export type SignInForm = {
  email: string,
  password: string
}

const SignIn: FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>();
  const {register, handleSubmit, formState: {errors}} = useForm<SignInForm>();
  const {mutate, isLoading} = useSignIn()

  const onSubmit: SubmitHandler<SignInForm> = ( data ) => {
    mutate( data, {
      onSuccess: ( res ) => {
        localStorage.setItem( 'token', res.accessToken )
        localStorage.setItem( 'userId', res.user.id )
        navigate( `/` )
      },
      onError: ( error ) => {
        if ( typeof error.response?.data === 'string' ) {
          setErrorMessage( error.response.data )
        }
        else {
          setErrorMessage( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      }
    } )
  };
  return (
    <div className="signup">
      <div className="container">
        <h3 className='pt-5 fw-bolder text-center'>ورود به حساب کاربری</h3>
        <p className='text-danger text-center'>{errorMessage}</p>
        <form onSubmit={handleSubmit( onSubmit )} className='signup-form' noValidate>
          <Input
            errors={errors}
            {...register( 'email',
              {
                required: 'ایمیل خود را وارد کنید',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'ایمیل اشتباه وارد شده'
                },
              } )}
            type='email'
            name='email'
            label='ایمیل'
          />
          <Input
            errors={errors}
            {...register( 'password',
              {
                required: 'رمز عبور را وارد کنید',
                pattern: {
                  value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                  message: 'رمز عبور با الگو مطابقت ندارد'
                },
              } )}
            type='password'
            name='password'
            label='رمز عبور'
          />
          <button className="btn btn-primary btn-block w-100 mt-3" disabled={isLoading}>
            {isLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
            ورود
          </button>
        </form>
        {
          errorMessage === 'حساب کاربری با این ایمیل وجود دارد' &&
          <>
            <div className="text-center mt-2">
              <Link to='/sign-up'> ثبت نام </Link>
            </div>
          </>
        }
      </div>
    </div >
  );
};

export default SignIn;
