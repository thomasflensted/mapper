import { ReactNode, createContext, useReducer, useEffect } from "react";
import { User } from "../types";

export type UserType = User;
export type StateType = { user: User };
export type ActionType = { type: string, payload: User }
export type UserContextType = { user: User, authDispatch: React.Dispatch<ActionType> }

export const AuthContext = createContext<UserContextType>({ user: null, authDispatch: () => { } });

const authReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const initialState: StateType = { user: null };
    const [state, authDispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const user: string | null = localStorage.getItem('user');
        if (user) authDispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }, [])

    console.log(state.user ? `User with name ${state.user.first_name} is logged in.` : "Auth state: Logged out.");

    return (
        <AuthContext.Provider value={{ ...state, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
