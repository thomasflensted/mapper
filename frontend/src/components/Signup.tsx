import { Link } from "react-router-dom"

const Signup = () => {

    const forms = [
        { text: "First Name", type: "text", optional: false },
        { text: "Last Name", type: "text", optional: true },
        { text: "Email", type: "email", optional: false },
        { text: "Password", type: "password", optional: false },
        { text: "Repeat Password", type: "password", optional: false },
    ]

    const twClasses: string = `flex flex-col border text-sm text-gray-500
    gap-4 w-1/4 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up`

    return (
        <form className={twClasses}>
            <h2 className="font-bold text-lg text-blue-600">Sign Up</h2>
            {forms.map(form =>
                <div key={form.text}>
                    <label htmlFor="">{form.text}</label>
                    {form.optional && <span className="text-gray-300 italic"> - optional</span>}
                    <input className="w-full border rounded px-2 py-1 focus:outline-1" type={form.type} />
                </div>
            )}
            <button className="border py-1.5 rounded bg-blue-500 text-white font-bold hover:bg-blue-600">Create Account</button>
            <Link to='/login' className="text-xs underline ">Already have An Account? Log In Here.</Link>
        </form>
    )
}

export default Signup