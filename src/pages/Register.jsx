import { useState } from 'react'
import imagePlaceholder from '../images/placeholder.png'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
function Register() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const userCollectionRef = collection(db, 'users');
  const [users, setUsers] = useState([]);

  //create login auth
  const createUserAuth = async (email, password) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  //check if user data exist 
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  //save user data
  const onSubmit = async (data) => {
    await addDoc(userCollectionRef, {
      fullname: data.fullname,
      age: data.age,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      country: data.country,
      username: data.username,
      email: data.email,
      password: data.password,
    }).then(userCollectionRef => {
      createUserAuth(data.email, data.password);
      setSuccess(true);
      setTimeout(() => setError(false), 3000);
      window.location.replace("/login");
    }).catch(error => {
      console.log(error);
      setError(true);
      setTimeout(() => setError(false), 4000);
    })
  };
  return (
    <main className='bg-base-200 mt-60px'>
      {
        error === true && (
          <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
            <div><span className='text-2xl'>😒</span>
              <span>Registration Error!Please try Again</span>
            </div>
          </div >
        )
      }
      {
        success === true && (
          <div className="alert alert-success mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
            <div><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Registration Success!</span>
            </div>
          </div >
        )
      }
      <div className="hero-content">
        <h1 className="text-5xl font-bold">✍️Register now!</h1>
      </div>
      <div className="hero  bg-base-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <div className="card">
                <div className="card-body">
                  <label className="label"> <span className="label-text">Username</span></label>
                  <input type="text" {...register("username", { required: true })} placeholder="Enter username" className="input input-bordered input-md w-full max-w-xs" />
                  {errors.username?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">username is required 😶</p>}
                  <label className="label"><span className="label-text">Password</span></label>
                  <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Enter password**" className="input input-bordered input-md w-full max-w-xs" />
                  {errors.password?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">password is required😶</p>}
                  {errors.password?.type === 'minLength' && <p className="label-text-alt text-red-400 pt-2">Password should be at least 6 characters😒</p>}

                </div>
              </div>
            </div>
            <div className="card ">
              <div className='card-header'>
                <div className="avatar grid">
                  <div className="w-24 mask mask-hexagon place-self-center" >
                    <label htmlFor="fileInput">
                      {
                        file ? (
                          <img
                            className="cursor-pointer"
                            src={URL.createObjectURL(file)}
                            alt="invalid Imagefile😒"
                          />
                        ) : (
                          <img className='cursor-pointer' src={imagePlaceholder} alt="nopic" />
                        )
                      }
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                </div>
              </div>
              <div className="card-body md:flex-row sm:flex-col lg:flex-row">
                <div>
                  <label className="label"><span className="label-text">Full Names</span></label>
                  <input type="text" {...register("fullname", { required: true })} placeholder="Enter your names" className="input input-bordered " />
                  {errors.fullname?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">fullname is required 😶</p>}
                  <label className="label"><span className="label-text">Age</span></label>
                  <input type="text" {...register("age", { required: true })} placeholder="Enter your age" className="input input-bordered" />
                  {errors.age?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">age is required 😶</p>}

                  <label className="label"><span className="label-text">Country of residence</span></label>
                  <select {...register("country", { required: true })} className="select select-bordered w-full max-w-xs">
                    <option selected disabled value="">Select country of residence</option>
                    <option value="kenya">Kenya</option>
                    <option value="uganda">Uganda</option>
                    <option value="tanzania">Tanzania</option>
                  </select>
                  {errors.country?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">country is required😶</p>}
                </div>
                <div className='md:ml-4 lg:ml-4'>
                  <label className="label"><span className="label-text">Gender</span></label>
                  <select {...register("gender", { required: true })} className="select select-bordered w-full max-w-xs">
                    <option selected disabled value="" >Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">gender is required 😶</p>}
                  <label className="label"><span className="label-text">Email</span></label>
                  <input {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} type="text" placeholder="Enter your email" className="input input-bordered" />
                  {errors.email?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">email is required 😶</p>}{errors.email?.type === 'pattern' && <p className="label-text-alt text-red-400 pt-2">invalid email😶</p>}
                  <label className="label"><span className="label-text">Phone Number</span></label>
                  <input type="text" {...register("phoneNumber", { required: true })} placeholder="Enter ie +254712547698" className="input w-full input-bordered" />
                  {errors.phoneNumber?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">phone number is required 😶</p>}
                </div>
              </div>
              <div className="form-control mt-3 grid">
                <button type="submit" className="btn btn-outline max-w-md place-self-center w-full">Register</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main >
  )
}

export default Register