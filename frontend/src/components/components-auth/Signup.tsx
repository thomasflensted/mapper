import { useState } from "react"
import { Link } from "react-router-dom"
import { ErrorMssg } from "../components-misc/ErrorAndSuccess"
import VisibilityIcon from "../components-misc/VisibilityIcon"
import { useSignup } from "../../hooks/user-hooks/useSignup"

const Signup = () => {

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const setterFuncs = [setFirstName, setLastName, setEmail, setPassword, setPasswordRepeat];
    const { signup, signUpError } = useSignup();

    // move all error handling onto server! Makes it easier to handle the errormessage and cleans up code here

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const signUpCreds = { first_name, last_name, email, profile_picture: '', password, passwordRepeat };
        await signup(signUpCreds)
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
            {signUpError && <ErrorMssg mssg={signUpError} />}
            <Link to='/login' className="text-xs underline ">Already have An Account? Log In Here.</Link>
        </div>
    )
}

export default Signup