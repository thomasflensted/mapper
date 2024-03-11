import MapCard, { Variants } from "./Mapcard"
import { Link } from "react-router-dom";
import mapexample from '/Users/thomasflensted/Documents/03 PROJECTS/mapper/frontend/src/assets/mapexample.png'
import { motion } from "framer-motion"
import { useAuthContext } from "../../hooks/useAuthContext";

const UserHome = () => {

    const { user } = useAuthContext();

    const container = { before: {}, after: { transition: { duration: .2, staggerChildren: .05 } } }
    const variants: Variants = {
        before: { opacity: 0, y: 50, scale: .75 },
        after: { opacity: 1, y: 0, scale: 1 }
    }

    const cards = [];
    for (let i = 0; i < 7; i++) {
        cards.push(<MapCard key={i} variants={variants} />);
    }

    return (
        <motion.div variants={container} animate='after' initial='before' className="flex flex-col items-center w-full gap-4 my-10">
            <h2 className="text-4xl font-bold text-blue-700">Welcome {user?.first_name}</h2>
            <p className="text-blue-500 font-md">Explore Your Maps</p>
            <div className="grid grid-cols-4 gap-6 mt-4">
                {cards}
                <Link to='/createmap' state={{ nameProp: '', descProp: '' }}>
                    <motion.div
                        variants={variants}
                        className="flex flex-col w-56 h-56 p-2 border shadow-md rounded-xl">
                        <img className='mb-2 rounded-lg' src={mapexample} alt="" />
                        <button className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-bold text-blue-600 border rounded-lg hover:bg-gray-50">
                            {cards.length === 0 ? "Create Your First Map" : "Create New Map"}
                        </button>
                    </motion.div>
                </Link>
            </div>
        </motion.div >
    )
}

export default UserHome