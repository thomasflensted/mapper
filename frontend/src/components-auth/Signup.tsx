import { useState } from "react"
import { Link } from "react-router-dom"
import { ErrorMssg } from "../components-misc/ErrorAndSuccess"
import VisibilityIcon from "../components-misc/VisibilityIcon"

const Signup = () => {

    const [error, setError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
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

    return (
        <div className="flex flex-col w-1/4 p-8 border rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up">
            <form className="flex flex-col gap-4 mb-4" onSubmit={(e) => handleSubmit(e)} id="userform">
                <h2 className="text-lg font-bold text-blue-600">Sign Up</h2>
                {forms.map((form, idx) =>
                    <div key={form.text} className="relative">
                        <label className='mr-1 text-xs text-gray-600'>{form.text}</label>
                        {form.optional && <span className="text-xs italic text-gray-300"> - optional</span>}
                        <input
                            onChange={(e) => setterFuncs[idx](e.target.value)}
                            className="text-input"
                            type={form.type === "password" && !passwordIsVisible ? "password" : "text"} />
                        {form.type === "password" && <VisibilityIcon visible={passwordIsVisible} change={setPasswordIsVisible} />}
                    </div>
                )}
                <button type="submit" form='userform' className="btn-blue">Create Account</button>
            </form>
            {error && <ErrorMssg mssg={error} />}
            <Link to='/login' className="text-xs underline ">Already have An Account? Log In Here.</Link>
        </div>
    )
}

export default Signup