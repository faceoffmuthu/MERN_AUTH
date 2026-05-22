import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true

    const backendUrl = import.meta.env.VITE_BASE_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth')
            if (data.success) {
                setIsLoggedIn(true)
                getUserData()
            }

        } catch (error) {
            if (error.response?.status === 401) {
                setIsLoggedIn(false)
                setUserData(false)
                return
            }

            console.error('Error in getAuthState:', error);
            toast.error(error.response?.data?.message || 'Error checking auth state');
        }
    }

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)

        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 400) {
                setIsLoggedIn(false)
                setUserData(false)
                return
            }

            console.error('Error in getUserData:', error);
            toast.error(error.response?.data?.message || 'Error fetching user data');
        }
    }

    useEffect(() => {
        getAuthState()
    }, [])

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};
