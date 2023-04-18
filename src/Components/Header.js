import React, { useEffect } from 'react'
import './Stylesheets/Header.css'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom';
import {BiUserCircle} from 'react-icons/bi';
const Header = ({ user, setUser }) => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('sessionUser')
        navigate('/');
        setUser(null);
    }
    useEffect(() => {
        const sessionUser = window.localStorage.getItem('sessionUser')
        if (sessionUser)
            setUser(JSON.parse(sessionUser))
        else {
            setUser(null)
            navigate('/');
        }

    }, []);
    return (
        <div className='headerPage'>
            {
                (user !== null) &&
                <div>
                    <button className='headerTextRight' onClick={logout}>
                        Logout
                    </button>
                    <b className='headerTextRight headerUser' style={{background:"none", color:"green", textTransform: 'capitalize', fontSize:"15px", position:"relative"}}><BiUserCircle size={20} className='userIcon'/> &ensp;<b style={{marginTop:"-5px", position:"relative", top:"-4px"}}>{user.patientId} - {user.firstName} {user.lastName}</b> </b>
                </div>
            }

            <div className='headerTitle'><span><img src={logo} alt="logo" width={35} height={35} /></span> Sammati - Consent Management System | Patient Site</div>
        </div>
    )
}

export default Header