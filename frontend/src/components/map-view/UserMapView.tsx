import { useParams } from "react-router-dom"
import { usePlaceContext } from "../../hooks/place-hooks/usePlaceContext";
import { usePlaces } from "../../hooks/place-hooks/usePlaces";
import { ErrorMssg } from "../misc/ErrorAndSuccess";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";

const UserMapView = () => {

    const { map_id } = useParams();
    const { places } = usePlaceContext();
    const { error, getPlaces } = usePlaces();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchPlaces = async () => { if (map_id) await getPlaces(user, map_id) }
        fetchPlaces();
    }, [])

    return (
        <div className="flex flex-col items-center w-full">
            <h1 onClick={() => console.log(places)}>{map_id}</h1>
            {places.map(place =>
                <div key={place._id} className="w-1/3 mb-2">
                    <h2 className="font-bold">{place.name}</h2>
                    <p>{place.description}</p>
                </div>
            )}
            {error && <ErrorMssg mssg={error} />}
        </div>
    )
}

export default UserMapView