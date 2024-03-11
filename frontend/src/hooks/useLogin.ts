import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {

    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { authDispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setLoginError('');

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const user = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setLoginError(user.error);
        } else {
            localStorage.setItem('user', JSON.stringify(user))
            authDispatch({ type: "LOGIN", payload: user })
            setIsLoading(false);
        }
    }
    return { login, loginError, isLoading };
}