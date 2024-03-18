import { motion } from "framer-motion";
import { Place, Places } from "../../types/placeTypes";
import { capitalizeFirstLetter } from "./popups/PopUpWithInfo";
import { MapStateActionType } from "../../types/mapStateActions";
import { useMapStateContext } from "../../hooks/map-state/useMapStateContext";


const MapListContainer = ({ filteredPlaces }: { filteredPlaces: Places }) => {

    const { currentPlace, view, mapStateDispatch } = useMapStateContext();

    const listAnimation = { visible: { x: 0 }, hidden: { x: 340 } };
    const transition = { ease: 'easeInOut', duration: .5 };

    if (currentPlace && view === 'list') {
        const listContainer = document.getElementById('container');
        const selectedPlaceTop = document.getElementById(currentPlace._id)?.offsetTop;
        if (selectedPlaceTop) listContainer?.scroll({ left: 0, top: selectedPlaceTop - 15, behavior: 'smooth' });
    }

    const handleSetPlace = (place: Place) => {
        mapStateDispatch({ type: MapStateActionType.SET_CURRENT_PLACE, payload: place })
    }

    return (
        <motion.div
            initial={false} variants={listAnimation} animate={view === 'list' ? "visible" : "hidden"} transition={transition} id='container'
            className="absolute right-0 z-10 w-1/4 h-full gap-4 p-4 overflow-y-scroll bg-white shadow-lg">
            {filteredPlaces.map((place: Place) =>
                <div
                    key={place._id}
                    onClick={() => handleSetPlace(place)}
                    className={`w-full p-4 mb-4 bg-white rounded shadow-sm ${currentPlace?._id === place._id ? 'border border-blue-600' : 'border'}`} id={place._id}>
                    <h3 className="text-sm font-bold text-blue-600">{place.name}</h3>
                    <p className="text-xs font-light text-gray-400">{capitalizeFirstLetter(place.type)}</p>
                    <p className="pr-1 my-3 text-xs font-medium text-slate-600">{place.description}</p>
                    <div className="flex justify-end gap-1">
                        <button className="px-5 py-1 text-xs font-medium btn-blue">Details</button>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default MapListContainer;