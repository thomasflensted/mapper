import { Link } from "react-router-dom"

const Login = () => {

    const forms = [
        { text: "Email", type: "email" },
        { text: "Password", type: "password" }
    ]

    const twClasses: string = `flex flex-col border text-sm text-gray-500 gap-4 w-1/4
    p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up`

    return (
        <form id="login" className={twClasses}>
            <h2 className="font-bold text-lg text-blue-600">Log In</h2>
            {forms.map(form =>
                <div key={form.text}>
                    <label htmlFor="">{form.text}</label>
                    <input className="w-full border rounded px-2 py-1 focus:outline-1" type={form.type} />
                </div>
            )}
            <button form="login" className="border py-1.5 rounded bg-blue-500 text-white font-bold hover:bg-blue-600">Log In</button>
            <Link to='/signup' className="text-xs underline ">New User? Sign Up Here.</Link>
        </form>
    )
}

export default Login