import { useContext } from 'react'
import { FaHome, FaPencilAlt, FaSignInAlt, FaUser, FaKey } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Context } from '../context/Context';
import { getAuth, signOut } from "firebase/auth";

import placeholder from '../images/placeholder.png';
function Header() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch({ type: "LOGOUT" });
      window.location.replace("/")
    }).catch((error) => {
      console.log(error);
    });

  }
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/" className='btn btn-ghost normal-case text-md'>Home</Link></li>
            <li tabIndex={0}>
              <Link to="/register" className='btn btn-ghost normal-case text-md'>Register</Link>
            </li>
            <li><Link to="/login" className='btn btn-ghost normal-case text-md'>Login</Link></li>
            <li><Link to={`/profile/${user.email}`} className='btn btn-ghost normal-case text-md'>Profile</Link></li>
            <li><Link to={`/profile/transfer/${user.email}`} className='btn btn-ghost normal-case text-md'>Transfer Funds</Link></li>
            {
              user && (
                <li>
                  <div className="dropdown dropdown-right">
                    <label tabIndex={0} className="avatar">
                      <FaUser className="w-10 rounded-full text-xl" />
                    </label>
                    <ul tabIndex={0} className="mt-10 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-30">
                      <li><Link to={`/profile/${user.email}`} className="justify-between">Profile</Link></li>
                      <li><Link to={`/profile/update/${user.email}`}>Settings</Link></li>
                      <li><a href='#' onClick={handleLogout}>Logout</a></li>
                    </ul>
                  </div>
                </li>

              )
            }
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" to="/">MpesaClone</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-6">
          <li><Link to="/" className='btn btn-ghost normal-case text-xl'><FaHome />Home</Link></li>
          <li><Link to="/register" className='btn btn-ghost normal-case text-xl'><FaPencilAlt />Register</Link></li>
          <li><Link to="/login" className='btn btn-ghost normal-case text-xl'><FaKey />Login</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        {
          user && (

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                <FaUser className="w-10 rounded-full text-xl" />
              </label>
              <ul tabIndex={0} className="mt-10 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-30">
                <li><Link to={`/profile/${user?._id}`} className="justify-between">Profile</Link></li>
                <li><Link to={`/profile/update/${user?._id}`}>Settings</Link></li>
                <li><a href='#' onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>

          )
        }
      </div>
    </div>
  )
}

export default Header