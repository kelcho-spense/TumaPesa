import { useState, useEffect, useContext } from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import imagePlaceholder from '../images/placeholder.png';
import { Context } from '../context/Context';
import { db, signup } from '../firebase-config';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";

function Profile() {
  const [userID, setUserID] = useState({});
  const [userData, setUserData] = useState({});
  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    const getId = async () => {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const data = await getDocs(q);         //firestore fetchmethod
      setUserID(data.docs[0].id);
    }
    getId();
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    }
    getUserData();

  }, [userID])



  console.log(userID);
  return (
    <div className='flex flex-row mt-60px md:h-full '>
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