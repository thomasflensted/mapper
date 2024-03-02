import MapCard from "./Mapcard"
import { Link } from "react-router-dom";
import mapexample from '../assets/mapexample.png'

const UserHome = () => {

    const cards = [];
    for (let i = 0; i < 5; i++) {
        cards.push(<MapCard />);
    }

    return (
        <div className="flex flex-col items-center mt-10 gap-4 w-full">
            <h2 className="text-blue-700 text-4xl font-bold">Welcome Thomas</h2>
            <p className="text-blue-500 font-md">Explore Your Maps</p>
            <div className="grid grid-cols-3 gap-6 mt-4">
                {cards}
                <Link to='/create'>
                    <div className="h-56 w-56 rounded-xl border shadow-md flex flex-col p-2">
                        <img className='rounded-lg mb-2' src={mapexample} alt="" />
                        <button className="flex text-sm h-full w-full justify-center items-center font-bold text-blue-600 py-2 px-4 rounded-lg border hover:bg-gray-50">Create New Map</button>
                        {/*<h2 className="font-bold text-lg text-blue-600">Create New Map</h2>*/}
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default UserHome