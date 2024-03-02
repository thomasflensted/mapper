import { useState } from "react"
import { Link } from "react-router-dom"
import { ErrorMssg } from "../components-misc/ErrorAndSuccess"

const Signup = () => {

    const [error, setError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const setterFuncs = [setFirstName, setLastName, setEmail, setPassword, setPasswordRepeat];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(firstName, lastName, email, password, passwordRepeat);
        setError(detectErrors());
        if (error) return;
    }

    const detectErrors = (): string => {
        if (!firstName) return "First name field must be filled out";
        if (!email) return "Email field must be filled out";
        if (!password || !passwordRepeat) return 'Password fields must be filled out';
        if (password !== passwordRepeat) return "Passwords are not matching"
        return '';
    }

    const forms = [
        { text: "First Name", type: "text", optional: false },
        { text: "Last Name", type: "text", optional: true },
        { text: "Email", type: "text", optional: false },
        { text: "Password", type: "password", optional: false },
        { text: "Repeat Password", type: "password", optional: false },
    ]

    const twClasses: string = `flex flex-col border text-sm text-gray-500
    gap-4 w-1/4 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up`

    return (
        <form className={twClasses} onSubmit={(e) => handleSubmit(e)} id="userform">
            <h2 className="font-bold text-lg text-blue-600">Sign Up</h2>
            {forms.map((form, idx) =>
                <div key={form.text}>
                    <label htmlFor="">{form.text}</label>
                    {form.optional && <span className="text-gray-300 italic"> - optional</span>}
                    <input
                        onChange={(e) => setterFuncs[idx](e.target.value)}
                        className="w-full border rounded px-2 py-1 focus:outline-1"
                        type={form.type} />
                </div>
            )}
            <button type="submit" form='userform' className="border py-1.5 rounded bg-blue-500 text-white font-bold hover:bg-blue-600">Create Account</button>
            {error && <ErrorMssg mssg={error} />}
            <Link to='/login' className="text-xs underline ">Already have An Account? Log In Here.</Link>
        </form>
    )
}

export default Signup