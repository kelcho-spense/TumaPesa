import { useState, useContext, useEffect } from 'react'
import UserProfileSidebar from '../components/UserProfileSidebar'
import { useForm } from "react-hook-form";
import { Context } from '../context/Context';
import { db, signup } from '../firebase-config';
import { collection, query, where, getDocs, getDoc, doc, setDoc } from "firebase/firestore";

function ProfileEdit() {
    const { user } = useContext(Context);
    const [userID, setUserID] = useState({});
    const [userData, setUserData] = useState({});
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getId = async () => {
            setLoading(true);
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const data = await getDocs(q);
            data.forEach((doc) => {
                setUserID(doc.id);
            });
            setLoading(false);
        }

        getId();
    }, [user.email])

    useEffect(() => {

        const getUserData = async () => {
            setLoading(true);
            const docRef = doc(db, "users", `${userID}`);
            const docSnap = await getDoc(docRef);
            setUserData(docSnap.data());
            setLoading(false);
        }

        getUserData();
    }, [userID])

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const userRef = doc(db, "users", `${userID}`);
            setLoading(true);
            await signup(data.email, data.password);
            const newData = {
                fullname: data.fullname,
                age: data.age,
                gender: data.gender,
                country: data.country,
                username: data.username,
                phoneNumber: data.phoneNumber,
                password: data.password,
                balance: 450,
                email: data.email,
            }
            setLoading(false);
            await setDoc(userRef, newData)
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            setLoading(false);
            setError(true);
            setTimeout(() => setError(false), 3000);
        }


    };

    return (
        <div className='flex flex-row mt-60px h-full'>
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
                            <span>Error! User Update Failed</span>
                        </div>
                    </div >
                )
            }
            <UserProfileSidebar />
            <main className='container flex-1   mt-2'>

                {
                    success === true && (
                        <div className="alert alert-success mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
                            <div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>User Update Successful Please log out for changes to take effect!</span>
                            </div>
                        </div >
                    )
                }
                <div className="hero-content">
                    <h1 className="text-5xl font-bold">Update User Profile</h1>
                </div>
                <div className="hero">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="hero-content flex-col lg:flex-row-reverse">

                            <div className="text-center lg:text-left">
                                <div className="card">

                                    <div className="card-body">
                                        <label className="label"> <span className="label-text">Username</span></label>
                                        <input type="text" {...register("username", { required: true })} placeholder={userData?.username} className="input input-bordered input-md w-full max-w-xs" />
                                        {errors.username?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">username is required 😶</p>}
                                        <label className="label"><span className="label-text">Password</span></label>
                                        <input {...register("password", { required: true })} type="password" placeholder="Enter password**" className="input input-bordered input-md w-full max-w-xs" />
                                        {errors.password?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">password is required😶</p>}

                                    </div>
                                </div>
                            </div>
                            <div className="card ">

                                <div className="card-body md:flex-row sm:flex-col lg:flex-row">
                                    <div>
                                        <label className="label"><span className="label-text">Full Names</span></label>
                                        <input type="text" {...register("fullname", { required: true })} placeholder={userData?.fullname} className="input input-bordered " />
                                        {errors.fullname?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">fullname is required 😶</p>}
                                        <label className="label"><span className="label-text">Age</span></label>
                                        <input type="text" {...register("age", { required: true })} placeholder={userData?.age} className="input input-bordered" />
                                        {errors.age?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">age is required 😶</p>}
                                        <label className="label"><span className="label-text">Phone Number</span></label>
                                        <input type="text" {...register("phoneNumber", { required: true })} placeholder={userData?.phoneNumber} className="input w-full input-bordered" />
                                        {errors.phoneNumber?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">phone number is required 😶</p>}
                                    </div>
                                    <div className='md:ml-4 lg:ml-4'>
                                        <label className="label"><span className="label-text">Gender</span></label>
                                        <select {...register("gender", { required: true })} className="select select-bordered w-full max-w-xs">
                                            <option disabled value="" >{userData?.gender}</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.gender?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">gender is required 😶</p>}
                                        <label className="label"><span className="label-text">Email</span></label>
                                        <input {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} type="text" placeholder={userData?.email} className="input input-bordered" />
                                        {errors.email?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">email is required 😶</p>}{errors.email?.type === 'pattern' && <p className="label-text-alt text-red-400 pt-2">invalid email😶</p>}
                                        <label className="label"><span className="label-text">Country of residence</span></label>
                                        <select {...register("country", { required: true })} className="select select-bordered w-full max-w-xs">
                                            <option disabled value="">{userData?.country}</option>
                                            <option value="kenya">Kenya</option>
                                            <option value="uganda">Uganda</option>
                                            <option value="tanzania">Tanzania</option>
                                        </select>
                                        {errors.country?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">country is required😶</p>}
                                    </div>
                                </div>
                                <div className="form-control mt-3 grid">
                                    <button type="submit" className="btn  max-w-md place-self-center w-full">Update User Data</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default ProfileEdit