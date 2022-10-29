import { useState, useEffect, useContext } from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import { Context } from '../context/Context';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";

function Profile() {
  const [userID, setUserID] = useState({});
  const [userData, setUserData] = useState({});
  const { user, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getId = async () => {
      setLoading(true);
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const data = await getDocs(q);         //firestore fetchmethod
      setUserID(data.docs[0].id);
      setLoading(true);
    }
    getId();
  }, [])

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

  return (
    <div className='flex flex-row mt-60px md:h-full '>
      {
        loading === true && (
          <div className="alert alert-success mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
            <div><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <progress className="progress w-56"></progress>
            </div>
          </div >
        )
      }
      <UserProfileSidebar />
      <main className='container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center md:h-full sm:h-full mx-2 mb-3'>
        <ul className="menu menu-vertical bg-base-200 rounded-box p-2 text-xl justify-center">
          <li><a>Current Balance : $ {userData?.balance}</a></li>
        </ul>
        <ul className="menu menu-vertical bg-base-200 rounded-box p-2 text-xl">
          <li><a href='#'>Full Names : {userData?.fullname}</a></li>
          <li><a href='#'>Age : {userData?.age}</a></li>
          <li><a href='#'>Gender : {userData?.gender}</a></li>
          <li><a href='#'>Email : {userData?.email}</a></li>
          <li><a href='#'>Phone Number : {userData?.phoneNumber}</a></li>
          <li><a href='#'>Country of Residence : {userData?.country}</a></li>
        </ul>
        <ul className="menu menu-vertical bg-base-200 rounded-box p-2 text-xl justify-center">
          <li><a>Username : {userData?.username}</a></li>
          <li><a>Password  : ******</a></li>
        </ul>
      </main>
    </div>
  )
}

export default Profile