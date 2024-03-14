import { Link } from "react-router-dom"
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";

const NavBar = () => {

    const { user } = useAuthContext();

    return (
        <header className="grow-0">
            <nav className='flex justify-between p-4'>
                <Link to='/' className="text-2xl font-bold text-blue-700">Mapper</Link>
                {!user && <Link to='/login'><button className="px-6 btn-blue">Log In</button></Link>}
                {user && <Link className="font-bold text-blue-600" to='/account'>Account</Link>}
            </nav>
        </header>
    )
}

export default NavBar