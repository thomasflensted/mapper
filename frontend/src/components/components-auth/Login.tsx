import { Link } from "react-router-dom"
import { ErrorMssg } from "../components-misc/ErrorAndSuccess"
import { useState } from "react"
import VisibilityIcon from "../components-misc/VisibilityIcon"
import { useLogin } from "../../hooks/useLogin"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const { loginError, login } = useLogin();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Both fields must be filled out.")
            return;
        }
        await login(email, password);
    }


    return (
        <div className="flex flex-col w-1/4 p-8 border rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up">
            <form id='login' className="flex flex-col gap-4 mb-4" onSubmit={(e) => handleSubmit(e)}>
                <h2 className='text-lg font-bold text-blue-600'>Log In</h2>
                <div className='relative'>
                    <label className='mr-1 text-xs text-gray-600'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="text-input" type='text' />
                </div>
                <div className='relative'>
                    <label className='mr-1 text-xs text-gray-600'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="text-input" type={passwordIsVisible ? 'text' : 'password'} />
                    <VisibilityIcon visible={passwordIsVisible} change={setPasswordIsVisible} />
                </div>
                <button form="login" className="btn-blue">Log In</button>
            </form>
            {error && <ErrorMssg mssg={error} />}
            {loginError && <ErrorMssg mssg={loginError} />}
            <Link to='/signup' className="text-xs underline ">New User? Sign Up Here.</Link>
        </div>
    )
}

export default Login