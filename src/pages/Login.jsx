import { useState, useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Context } from '../context/Context';
import login from "../images/Login.png";
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const { dispatch } = useContext(Context);
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();
  }, [register]);
  const onSubmit = async (data) => {
    if (users) {
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if (user.username == data.username && user.password == data.password) {
          console.log(user.username);
          break;
        }
        setError(true);
        setTimeout(() => setError(false), 3000);

      }
      // users.forEach(user => {
      //   if (user.username == data.username && user.password == data.password) {
      //     console.log(user.username);
      //   }
      // });
      // setError(true);
      // setTimeout(() => setError(false), 3000);
      // try {
      //   const res = await axios.post('/auth/login', data);
      //   dispatch({ type: 'LOGIN_SUCCESS', payload: res?.data });
      //   window.location.replace(`/profile/${res.data._id}`)
      // } catch (error) {
      //   dispatch({ type: 'LOGIN_FAILURE' });
      //   setError(true);
      //   setTimeout(() => setError(false), 3000);
      // }
    };
  };
  return (
    <div className='grid mt-60px'>
      {
        error === true && (
          <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
            <div><span className='text-2xl'>😒</span>
              <span>Error! Wrong credentials</span>
            </div>
          </div >
        )
      }
      <div className="hero-content flex-col lg:flex-row-reverse justify-around">
        <div className="hero-content">
          < div className="card flex-shrink-0 w-full max-w-sm shadow-4xl p-2 bg-base-200 place-self-center" >
            <div className="card-header">
              <h1 className="text-5xl font-bold  px-2">Login🔐</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Username</span>
                  </label>
                  <input type="text" {...register("username", { required: true })} placeholder="Enter username" className="input input-warning input-lg input-bordered" />
                  {errors.username?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">username is required 😶</p>}
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
          <img alt='no pic' src={login} className="max-w-lg rounded-lg shadow-2xl" />
        </div>
      </div>
    </div>
  )
}

export default Login

