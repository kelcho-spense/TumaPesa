import { useContext } from 'react'
import { FaUser, FaCog, FaMoneyCheckAlt } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { Context } from '../context/Context';

function UserProfileSidebar() {
    const { user } = useContext(Context);
    return (
        <div className='sm:hidden md:block'>
            <ul className="menu bg-base-300  items-start justify-start text-3xl mt-20px h-full ">
                <li className='w-full'><Link to={`/profile/${user?._id}`}><FaUser /> Profile</Link></li>
                <li><Link to={`/profile/transfer/${user?._id}`}><FaMoneyCheckAlt /> Transfer Funds</Link></li>
                <li><Link to={`/profile/update/${user?._id}`}><FaCog />Edit Profile</Link></li>
            </ul>
        </div>
    )
}

export default UserProfileSidebar