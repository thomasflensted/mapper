import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {

    const [signUpError, setSignUpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { authDispatch } = useAuthContext();

    type signupArgs = {
        first_name: string,
        last_name: string,
        email: string,
        profile_picture: string,
        password: string
    };

    const signup = async (args: signupArgs) => {
        setIsLoading(true);
        setSignUpError('');

        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...args })
        });

        const user = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setSignUpError(user.error);
        } else {
            localStorage.setItem('user', JSON.stringify(user))
            authDispatch({ type: "LOGIN", payload: user })
            setIsLoading(false);
        }
    }
    return { signup, signUpError, isLoading };
}