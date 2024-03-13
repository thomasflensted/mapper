import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useSignup = () => {

    const [signUpError, setSignUpError] = useState('');
    const { authDispatch } = useAuthContext();

    type signupArgs = {
        first_name: string,
        last_name: string,
        email: string,
        profile_picture: string,
        password: string,
        passwordRepeat: string,
    };

    const signup = async (args: signupArgs) => {
        setSignUpError('');

        const response = await fetch(`${BASE_URL}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...args })
        });

        const json = await response.json();

        if (!response.ok) {
            setSignUpError(json.message);
        } else {
            localStorage.setItem('user', JSON.stringify(json))
            authDispatch({ type: "LOGIN", payload: json })
        }
    }
    return { signup, signUpError };
}