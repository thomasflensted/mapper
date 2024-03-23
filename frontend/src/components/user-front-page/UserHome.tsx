// libraries and react
import { motion } from "framer-motion"

// hooks / context / types
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import { useMapContext } from "../../hooks/map-hooks/useMapContext";
import { useMaps } from "../../hooks/map-hooks/useMaps";
import { useEffect } from "react";

// components
import { MapGrid } from "./MapGrid";
import { MapStateActionType } from "../../types/mapStateActions";
import { useMapStateContext } from "../../hooks/map-state/useMapStateContext";

const UserHome = () => {

    const { mapStateDispatch } = useMapStateContext()
    const { user } = useAuthContext();
    const { maps } = useMapContext();
    const { error, isLoading, getMaps } = useMaps();

    const containerAnimation = { before: {}, after: { transition: { duration: .2, staggerChildren: .1 } } }

    useEffect(() => {
        mapStateDispatch({ type: MapStateActionType.SET_ADJUSTING, payload: false });
        mapStateDispatch({ type: MapStateActionType.SET_PLACE, payload: null });
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false });
        mapStateDispatch({ type: MapStateActionType.SET_VIEW, payload: 'marker' });
        const fetchMaps = async () => await getMaps(user);
        fetchMaps();
    }, [])

    return (
        <motion.div
            variants={containerAnimation}
            animate='after' initial='before'
            className="flex flex-col items-center w-full gap-4 my-10">
            {!error && !isLoading && <>
                <h2 className="text-4xl font-bold text-blue-700">Welcome {user?.first_name}</h2>
                <p className="text-blue-500 font-md">{maps.length === 0 ? "Create Your First Map" : "Explore Your Maps"}</p>
                <MapGrid />
            </>}
            {isLoading && <h2 className="text-lg font-semibold text-gray-500">Loading Maps...</h2>}
            {error && <h2 className="font-bold text-red-500 text-md">{`There was an error: ${error}`}</h2>}
        </motion.div >
    )
}

export default UserHome