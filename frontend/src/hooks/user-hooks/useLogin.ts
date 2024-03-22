import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useLogin = () => {

    const [loginError, setLoginError] = useState('');
    const { authDispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setLoginError('');

        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();

        if (!response.ok) {
            setLoginError(json.message);
        } else {
            localStorage.setItem('user', JSON.stringify(json))
            authDispatch({ type: "LOGIN", payload: json })
        }
    }
    return { login, loginError };
}