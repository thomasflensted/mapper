const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const handleResponse = async (response: Response, setUpdateError: React.Dispatch<React.SetStateAction<string>>) => {

    const json = await response.json();
    if (!response.ok) {
        console.log(json);
        setUpdateError(json.message);
        return null;
    } else {
        localStorage.setItem('user', JSON.stringify(json));
    }
    return json;
}

export const useUpdateUser = () => {

    const [updateError, setUpdateError] = useState('');
    const { authDispatch, user } = useAuthContext();

    const updateUserName = async (first_name: string, last_name: string) => {

        if (!user) return;

        const response = await fetch(`${BASE_URL}/user/updateNames`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, first_name, last_name })
        })

        const result = await handleResponse(response, setUpdateError);
        if (result) {
            authDispatch({ type: "LOGIN", payload: result })
            return "Account name was successfully updated."
        }
        return null;
    }

    const updateEmail = async (newEmail: string, password: string) => {

        if (!user) return;

        const response = await fetch(`${BASE_URL}/user/updateEmail`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldEmail: user.email, newEmail, password })
        })

        const result = await handleResponse(response, setUpdateError);
        if (result) {
            authDispatch({ type: "LOGIN", payload: result })
            return "Account email was successfully updated."
        }
        return null;
    }

    const updatePassword = async (oldPassword: string, newPassword: string, newPasswordRepeat: string) => {

        if (!user) return;

        const response = await fetch(`${BASE_URL}/user/updatePassword`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                oldPassword,
                newPassword,
                newPasswordRepeat
            })
        })

        const result = await handleResponse(response, setUpdateError);
        if (result) {
            authDispatch({ type: "LOGIN", payload: result })
            return "Account password was successfully updated."
        }
        return null;
    }

    const deleteUser = async () => {

        if (!user) return { success: false, mssg: "Something went wrong when deleting your account." };

        const response = await fetch(`${BASE_URL}/user/${user._id}`, { method: 'DELETE' });
        if (!response.ok) {
            return { success: false, mssg: "Something went wrong when deleting your account." }
        } else {
            localStorage.removeItem('user');
            authDispatch({ type: 'LOGOUT', payload: null });
            return { success: true, mssg: "Account was successfully deleted" }
        }
    }

    return { updateUserName, updateEmail, updatePassword, deleteUser, updateError, setUpdateError }
}

export default useUpdateUser;