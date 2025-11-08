import React from 'react'
import { logo, arrow_icon } from '../../assets/images'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
    const navigate = useNavigate()
    const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext)

    const sendVerificationEmail = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')
            if(data.success){
                navigate('/verify-email');
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error sending verification email');
        }
    }


    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(backendUrl + '/api/auth/logout')
            data.success && setIsLoggedIn(false)
            data.success && setUserData(false)
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error logging out');

        }
    }

    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
            <img src={logo} alt="" className='w-28 sm:w-32' />
            {userData ?
                <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
                    {userData.name[0].toUpperCase()}
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                        <ul className='list-none m-0 p-2 bg-gray-100 test-sm'>
                            {!userData.isAccountVerified &&
                                <li onClick={sendVerificationEmail} className='cursor-pointer hover:bg-gray-200 px-2 py-1'>Verify Email</li>
                            }
                            <li onClick={logout} className='cursor-pointer hover:bg-gray-200 px-2 py-1 pr-10'>Logout</li>
                        </ul>

                    </div>
                </div>
                :
                <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full text-gray-800 hover:bg-gray-100 px-4 py-2 transition-all'>Login <img src={arrow_icon} alt="" /></button>
            }
        </div>
    )
}

export default Navbar