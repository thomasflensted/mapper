import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header className="grow-0">
            <nav className='flex justify-between p-4'>
                <Link to='/' className="text-2xl font-bold text-blue-700">Mapper</Link>
                <Link to='/login'>
                    <button className="bg-blue-500 px-6 py-2 text-white rounded font-medium hover:bg-blue-600">Log In</button>
                </Link>
            </nav>
        </header>
    )
}

export default NavBar