import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header className="grow-0">
            <nav className='flex justify-between p-4'>
                <Link to='/' className="text-2xl font-bold text-blue-700">Mapper</Link>
                <Link to='/login'>
                    <button className="px-6 btn-blue">Log In</button>
                </Link>
            </nav>
        </header>
    )
}

export default NavBar