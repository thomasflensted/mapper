import { Link } from "react-router-dom"
import { ErrorMssg } from "../components-misc/ErrorAndSuccess"
import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const forms = [{ text: "Email", type: "text" }, { text: "Password", type: "password" }]
    const setFuncs = [setEmail, setPassword];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Both fields must be filled out.")
            return;
        }
        console.log(email, password)
    }

    const twClasses: string = `flex flex-col border text-sm text-gray-500 gap-4 w-1/4
    p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up`

    return (
        <form id="login" className={twClasses} onSubmit={(e) => handleSubmit(e)}>
            <h2 className="font-bold text-lg text-blue-600">Log In</h2>
            {forms.map((form, idx) =>
                <div key={form.text}>
                    <label htmlFor="">{form.text}</label>
                    <input onChange={(e) => setFuncs[idx](e.target.value)} className="w-full border rounded px-2 py-1 focus:outline-1" type={form.type} />
                </div>
            )}
            <button form="login" className="border py-1.5 rounded bg-blue-500 text-white font-bold hover:bg-blue-600">Log In</button>
            {error && <ErrorMssg mssg={error} />}
            <Link to='/signup' className="text-xs underline ">New User? Sign Up Here.</Link>
        </form>
    )
}

export default Login