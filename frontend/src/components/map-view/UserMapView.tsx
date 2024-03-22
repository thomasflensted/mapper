// router and hooks
import { Link, useParams } from "react-router-dom"
import { usePlaceContext } from "../../hooks/place-hooks/usePlaceContext";
import { usePlaces } from "../../hooks/place-hooks/usePlaces";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import { useMaps } from "../../hooks/map-hooks/useMaps";

// components
import MapContainer from "../map/MapContainer";
import { ErrorMssg } from "../global-misc-general/ErrorAndSuccess";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { PlaceActionType } from "../../types/placeActions";

const UserMapView = () => {

    const { map_id } = useParams();
    const { getSingleMap, mapData } = useMaps();
    const { places, placeDispatch } = usePlaceContext();
    const { error, getPlaces } = usePlaces();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchMapData = async () => { if (map_id) await getSingleMap(user, map_id) }
        const fetchPlaces = async () => { if (map_id) await getPlaces(user, map_id) }
        fetchMapData();
        fetchPlaces();
    }, [])

    return (
        <div className="relative flex flex-col items-center w-full gap-10 mb-20">
            <Link to='/'>
                <motion.div
                    onClick={() => placeDispatch({ type: PlaceActionType.SET_PLACES, payload: [] })}
                    whileHover={{ x: -8 }}
                    className="absolute flex items-center py-2 left-20 top-16 hover:cursor-pointer group">
                    <FaArrowLeftLong className="text-blue-400 group-hover:text-blue-600" />
                    <p className="ml-2 text-xs text-blue-400 group-hover:text-blue-600">Back to maps</p>
                </motion.div>
            </Link>
            <div className="w-1/2 text-center ">
                <h2 className="mb-2 text-2xl font-bold text-blue-600">{mapData ? mapData.name : ''}</h2>
                <p className="font-light text-blue-600 ">{mapData ? mapData.description : ''}</p>
            </div>
            <MapContainer places={places} map_id={map_id ? map_id : ''} />
            {error && <ErrorMssg mssg={error} />}
        </div>
    )
}

export default UserMapView