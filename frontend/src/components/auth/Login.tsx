// components
import { Link } from "react-router-dom"
import { ErrorMssg } from "../global-misc-general/ErrorAndSuccess"
import { LabelAndInput, PasswordInput } from "../global-misc-general/FormComponents"

// hooks
import { useState } from "react"
import { useLogin } from "../../hooks/user-hooks/useLogin"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const { loginError, login } = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <div className="flex flex-col w-1/4 p-8 border rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up">
            <form id='login' className="flex flex-col gap-4 mb-4" onSubmit={(e) => handleSubmit(e)}>
                <h2 className='text-lg font-bold text-blue-600'>Log In</h2>
                <LabelAndInput heading='Email' value={email} setter={setEmail} optional={false} />
                <PasswordInput heading='Password' setText={setPassword} isVisible={passwordIsVisible} setVisibility={setPasswordIsVisible} />
                <button form="login" className="btn-blue">Log In</button>
            </form>
            {loginError && <ErrorMssg mssg={loginError} marginBottom={2} />}
            <Link to='/signup' className="text-xs underline ">New User? Sign Up Here.</Link>
        </div >
    )
}

export default Login