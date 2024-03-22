import { usePlaceContext } from "../../hooks/place-hooks/usePlaceContext"
import { capitalizeFirstLetter } from "../map/markers-and-popups/PopUpWithInfo";

const PlaceList = () => {

    const { places } = usePlaceContext();

    return (
        <div className="flex flex-col items-center gap-6">
            {places.map(place =>
                <div className="w-1/2 p-6 border rounded-lg shadow-md">
                    <div className="mb-2">
                        <h1 className="font-bold text-blue-600">{place.name}</h1>
                        <p className="text-xs font-light text-gray-400">{capitalizeFirstLetter(place.type)}</p>
                    </div>
                    <p className="font-medium text-gray-600">{place.description}</p>
                </div>
            )}
        </div>
    )
}

export default PlaceList