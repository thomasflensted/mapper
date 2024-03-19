import { useState } from "react"
import { Link } from "react-router-dom"
import { ErrorMssg } from "../global-misc-general/ErrorAndSuccess"
import { useSignup } from "../../hooks/user-hooks/useSignup"
import { LabelAndInput, PasswordInput } from "../global-misc-general/FormComponents"

const Signup = () => {

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const { signup, signUpError } = useSignup();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const signUpCreds = { first_name, last_name, email, profile_picture: '', password, passwordRepeat };
        await signup(signUpCreds)
    }

    return (
        <div className="flex flex-col w-1/4 p-8 border rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up">
            <form className="flex flex-col gap-4 mb-4" onSubmit={(e) => handleSubmit(e)} id="userform">
                <h2 className="text-lg font-bold text-blue-600">Sign Up</h2>

                <LabelAndInput heading='First Name' value={first_name} setter={setFirstName} optional={false} />
                <LabelAndInput heading='Last Name' value={last_name} setter={setLastName} optional={true} />
                <LabelAndInput heading='Email' value={email} setter={setEmail} optional={false} type="email" />
                <PasswordInput setText={setPassword} isVisible={passwordIsVisible} setVisibility={setPasswordIsVisible} />
                <PasswordInput heading="Repeat Password" setText={setPasswordRepeat} isVisible={passwordIsVisible} setVisibility={setPasswordIsVisible} />
                <button type="submit" form='userform' className="btn-blue">Create Account</button>

            </form>
            {signUpError && <ErrorMssg mssg={signUpError} marginBottom={2} />}
            <Link to='/login' className="text-xs underline ">Already have An Account? Log In Here.</Link>
        </div>
    )
}

export default Signup