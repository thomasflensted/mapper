import { Link } from "react-router-dom"
import MapCard, { Variants, chooseRandomImage } from "./Mapcard"
import { motion } from "framer-motion"
import { useMapContext } from "../../hooks/map-hooks/useMapContext"

export const MapGrid = () => {

    const { maps } = useMapContext();

    const variants: Variants = {
        before: { opacity: 0, y: 50, scale: .75 },
        after: { opacity: 1, y: 0, scale: 1 }
    }

    const image = chooseRandomImage();

    return (
        <div className="grid grid-cols-4 gap-6 mt-4">
            {maps.map(map =>
                <Link to={`/map/${map._id}`} key={map._id}>
                    <MapCard variants={variants} name={map.name} description={map.description} id={map._id} />
                </Link>
            )}
            <Link to='/map/create'>
                <motion.div
                    variants={variants}
                    className="flex flex-col w-56 h-56 p-2 border shadow-md rounded-xl">
                    <img className='mb-2 rounded-lg' src={image} alt="" />
                    <button className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-bold text-blue-600 border rounded-lg hover:bg-gray-50">
                        {maps.length === 0 ? "Create Your First Map" : "Create New Map"}
                    </button>
                </motion.div>
            </Link>
        </div >
    )
}
