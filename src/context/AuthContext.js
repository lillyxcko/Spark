import { jsx as _jsx } from "react/jsx-runtime";
import { getCurrentUser } from '@/lib/appwrite/api';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false,
};
const AuthContext = createContext(INITIAL_STATE);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                });
                setIsAuthenticated(true);
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (cookieFallback === "[]" ||
            cookieFallback === null ||
            cookieFallback === undefined) {
            navigate("/sign-in");
        }
        checkAuthUser();
    }, []);
    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
};
export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
