const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useState } from "react";
import { User } from "../types";

type UserArgument = User | null | undefined;

export const useUpdateUser = () => {

    const [updateError, setUpdateError] = useState('');

    const updateUserName = async (user: UserArgument, first_name: string, last_name: string) => {

        if (!user) return;

        const response = await fetch(`${BASE_URL}/user/updateNames`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, first_name, last_name })
        })

        const data = await response.json();

        if (!response.ok) {
            setUpdateError(data.message);
            return null;
        }
        return data;
    }

    const updateEmail = async (user: UserArgument, newEmail: string, password: string) => {

        if (!user) return;

        const response = await fetch(`${BASE_URL}/user/updateEmail`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldEmail: user.email, newEmail, password })
        })
        const data = await response.json();
        if (!response.ok) {
            setUpdateError(data.error);
            return null;
        }
        return data;
    }

    const updatePassword = async (user: UserArgument, oldPassword: string, newPassword: string, newPasswordRepeat: string) => {

        if (!user) return;

        const response = await fetch(`${BASE_URL}/user/updatePassword`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                oldPasswordTyped: oldPassword,
                newPassword,
                newPasswordRepeat
            })
        })

        const data = await response.json();

        if (!response.ok) {
            setUpdateError(data.error);
            return null;
        }
        return data;
    }

    return { updateUserName, updateEmail, updatePassword, updateError }
}

export default useUpdateUser;