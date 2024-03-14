import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { authDispatch } = useAuthContext();
    const logout = () => {
        localStorage.removeItem("user");
        authDispatch({ type: "LOGOUT", payload: null });
    }
    return { logout };
}