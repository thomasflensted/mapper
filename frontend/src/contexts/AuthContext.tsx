import { ReactNode, createContext, useReducer } from "react";
import { User } from "../types/userTypes";

export type UserType = User;
export type StateType = { user: User };
export type ActionType = { type: string, payload: User }
export type UserContextType = { user: User, authDispatch: React.Dispatch<ActionType> } | null;

export const AuthContext = createContext<UserContextType>(null);

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

    const userExists: string | null = localStorage.getItem('user');
    const initialState: StateType = { user: userExists ? JSON.parse(userExists) : null };

    const [state, authDispatch] = useReducer(authReducer, initialState);
    console.log(state.user ? `${state.user.first_name} is logged in.` : "Auth state: Logged out.");

    return (
        <AuthContext.Provider value={{ ...state, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
