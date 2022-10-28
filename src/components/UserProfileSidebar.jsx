import { useContext } from 'react'
import { FaUser, FaCog, FaMoneyCheckAlt } from 'react-icons/fa'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Context } from '../context/Context';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

function UserProfileSidebar() {
    const { user } = useContext(Context);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const userCollectionRef = collection(db, 'users');

    //save user data
    const onTransfer = async (data) => {
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
            window.location.replace("/login");
        }).catch(error => {
        })
    }
    const onCredit = async (data) => {
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
            window.location.replace("/login");
        }).catch(error => {
        })
    }

    return (
        <div className='sm:hidden md:block'>
            <ul className="menu bg-base-300  items-start justify-start text-1xl mt-20px h-full ">
                <li className='w-full'><Link to={`/profile/${user?.email}`}><FaUser /> Profile</Link></li>
                <li><label htmlFor="my-modal-3" className="btn modal-button"><FaMoneyCheckAlt />Transfer My Funds</label></li>
                <li><label htmlFor="my-modal-2" className="btn modal-button"><FaMoneyCheckAlt />Credit My Account</label></li>
                <li><Link to={`/profile/update/${user?.email}`}><FaCog />Edit Profile</Link></li>
            </ul>


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <form onSubmit={handleSubmit(onTransfer)}>
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} type="text" placeholder="Enter your email" className="input w-full input-bordered" />
                        {errors.email?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">email is required 😶</p>}{errors.email?.type === 'pattern' && <p className="label-text-alt text-red-400 pt-2">invalid email😶</p>}
                        <label className="label"><span className="label-text">Phone Number</span></label>
                        <input type="text" {...register("phoneNumber", { required: true })} placeholder="Enter ie +254712547698" className="input w-full input-bordered" />
                        {errors.phoneNumber?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">phone number is required 😶</p>}
                        <label className="label"><span className="label-text">Amount</span></label>
                        <input type="number" {...register("amount", { required: true })} placeholder="Enter ie $2" className="input w-full input-bordered" />
                        {errors.amount?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">amount is required 😶</p>}
                        <div className="form-control mt-3 grid">
                            <button type="submit" className="btn btn-outline max-w-sm place-self-center w-[3/4]">Register</button>
                        </div>
                    </form>
                </div>
            </div>

            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <form onSubmit={handleSubmit(onCredit)}>
                        <div className="form-control mt-3 grid">
                            <label className="label"><span className="label-text">Credit my Account Via Mpesa</span></label>
                        </div>
                        <label className="label"><span className="label-text">Amount</span></label>
                        <input type="number" {...register("amount", { required: true })} placeholder="Enter ie $2" className="input w-full input-bordered" />
                        {errors.amount?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">amount is required 😶</p>}
                        <div className="form-control mt-3 grid">
                            <button type="submit" className="btn btn-outline max-w-sm place-self-center w-[3/4]">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserProfileSidebar