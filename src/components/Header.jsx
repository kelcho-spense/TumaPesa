import { useContext } from 'react'
import { FaHome, FaPencilAlt, FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Context } from '../context/Context';
import placeholder from '../images/placeholder.png';
function Header() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/")
  }
  return (
    <div className="navbar bg-base-100">
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
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" to="/">MpesaClone</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-6">
          <li><Link to="/" className='btn btn-ghost normal-case text-xl'>Home</Link></li>
          <li><Link to="/register" className='btn btn-ghost normal-case text-xl'>Register</Link></li>
          <li><Link to="/login" className='btn btn-ghost normal-case text-xl'>Login</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="avatar">
          <div className="w-10 rounded-full  ring-offset-base-100 ring-offset-2">
            <img src={placeholder} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header