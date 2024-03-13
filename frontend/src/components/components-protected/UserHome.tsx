// libraries and react
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

// hooks / context / types
import { useAuthContext } from "../../hooks/useAuthContext";
import { useMapContext } from "../../hooks/useMapContext";
import { ActionType } from "../../types/mapActions";

// components
import { MapGrid } from "./MapGrid";

// api base url
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserHome = () => {

    const { user } = useAuthContext();
    const { maps, mapDispatch } = useMapContext();
    const [error, setError] = useState('');

    const containerAnimation = { before: {}, after: { transition: { duration: .2, staggerChildren: .05 } } }

    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const response = await fetch(`${BASE_URL}/map/user_maps/${user?._id}`,
                    { headers: { 'Authorization': `Bearer ${user?.token}` } });
                if (!response.ok) throw Error("There was an error retrieving your maps.");
                const mapData = await response.json();
                mapDispatch({ type: ActionType.SET_MAPS, payload: mapData });
            } catch (err: any) {
                setError('There was an error retrieving your maps from the server.');
            }
        }
        fetchMaps();
    }, [user, mapDispatch, error])

    return (
        <motion.div variants={containerAnimation} animate='after' initial='before' className="flex flex-col items-center w-full gap-4 my-10">
            <h2 className="text-4xl font-bold text-blue-700">Welcome {user?.first_name}</h2>
            <p className="text-blue-500 font-md">{maps.length === 0 ? "Create Your First Map" : "Explore Your Maps"}</p>
            {!error && <MapGrid />}
            {error && <h2 className="font-bold text-red-500 text-md">{error}</h2>}
        </motion.div >
    )
}

export default UserHome