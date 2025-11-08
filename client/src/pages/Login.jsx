import React, { useContext, useState } from 'react'
import { lock_icon, logo, mail_icon, person_icon } from '../assets/images'
import PasswordInput from '../components/Shared/PasswordInput'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()

    const {backendUrl,setIsLoggedIn,getUserData} = useContext(AppContext)

    const [state, setState] = useState('Sign up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            axios.defaults.withCredentials = true
            
            if(state === 'Sign up') {

            const {data} = await axios.post(backendUrl + '/api/auth/register', {name,email,password})

            if(data.success){
                setIsLoggedIn(true)
                getUserData()
                navigate('/')
            }
            else{
                toast.error(data.message)
                
            }

            }else{
                const {data} = await axios.post(backendUrl + '/api/auth/login', {email,password})

            if(data.success){
                setIsLoggedIn(true)
                getUserData()
                navigate('/')
            }
            else{
                toast.error(data.message)
                
            }
                
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again.';
            toast.error(errorMessage);
            console.error('Login error:', error);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 font-outfit'>
            <img onClick={() => navigate('/')} src={logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>

                <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign up' ? 'Create Account' : 'Login'}</h2>
                <p className='text-center text-sm mb-6'>{state === 'Sign up' ? 'Create your Account' : 'Login to your account!'}</p>

                <form onSubmit={handleSubmit}>
                    {state === 'Sign up' && (
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={person_icon} alt="" />
                            <input value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='bg-transparent outline-none' type="text"
                                placeholder='Full Name' required />
                        </div>
                    )}
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={mail_icon} alt="" />
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-transparent outline-none' type="email"
                            placeholder='Enter your Email' required />
                    </div>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={lock_icon} alt="" className='w-3 h-3'/>
                        <PasswordInput 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                        />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>

                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer'>{state}</button>
                </form>
                {state === 'Sign up' ? (<p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{''}
                    <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span></p>)
                    : (<p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{''}
                        <span onClick={() => setState('Sign up')} className='text-blue-400 cursor-pointer underline'>Sign up here</span></p>)}


            </div>


        </div>
    )
}

export default Login