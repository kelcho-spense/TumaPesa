import { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { Context } from '../context/Context';
import loginimg from "../images/Login.png";
import { login } from '../firebase-config';
function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(Context);


  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      console.log('login successful');
      setLoading(false);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      window.location.replace(`/profile/${data.email}`)
    } catch {
      setLoading(false);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };
  return (
    <div className='grid mt-60px'>
      {
        loading === true && (
          <div className="alert alert-success mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
            <div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <progress className="progress w-56"></progress>
            </div>
          </div >
        )
      }
      {
        error === true && (
          <div className="alert alert-success mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
            <div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Error! Wrong credentials</span>
            </div>
          </div >
        )
      }
      <div className="hero-content flex-col lg:flex-row-reverse justify-around">
        <div className="hero-content">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-4xl p-2 bg-base-200 place-self-center" >
            <div className="card-header">
              <h1 className="text-5xl font-bold  px-2">Login🔐</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Email</span>
                  </label>
                  <input {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} type="text" placeholder="Enter your email" className="input input-bordered" />
                  {errors.email?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">email is required 😶</p>}{errors.email?.type === 'pattern' && <p className="label-text-alt text-red-400 pt-2">invalid email😶</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Password</span>
                  </label>
                  <input type="password" {...register("password", { required: true })} placeholder="Enter password" className="input input-warning input-lg input-bordered" />
                  {errors.password?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">password is required😶</p>}
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-outline btn-warning">Login</button>
                </div>
              </form>
            </div>
          </div >
        </div>
        <div className="hero-content">
          <img alt='no pic' src={loginimg} className="max-w-lg rounded-lg shadow-2xl" />
        </div>
      </div>
    </div>
  )
}

export default Login

