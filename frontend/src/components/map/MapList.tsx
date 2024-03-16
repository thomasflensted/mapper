import { motion } from "framer-motion";
import { Place, Places } from "../../types/placeTypes";
import { View } from "../../types/mapTypes";
import { capitalizeFirstLetter } from "./popups/PopUpWithInfo";

type MapListProps = {
    filteredPlaces: Places,
    currentPlace: Place | null,
    setCurrentPlace: React.Dispatch<React.SetStateAction<Place | null>>,
    view: View,
}

const MapListContainer = ({ filteredPlaces, currentPlace, setCurrentPlace, view }: MapListProps) => {

    const listAnimation = { visible: { x: 0 }, hidden: { x: 340 } };
    const transition = { ease: 'easeInOut', duration: .5 };

    if (currentPlace && view === 'list') {
        const listContainer = document.getElementById('container');
        const selectedPlaceTop = document.getElementById(currentPlace._id)?.offsetTop;
        if (selectedPlaceTop) listContainer?.scroll({ left: 0, top: selectedPlaceTop - 15, behavior: 'smooth' });
    }

    return (
        <motion.div
            initial={false} variants={listAnimation} animate={view === 'list' ? "visible" : "hidden"} transition={transition} id='container'
            className="absolute right-0 z-10 w-1/4 h-full gap-4 p-4 overflow-y-scroll bg-white shadow-lg">
            {filteredPlaces.map((place: Place) =>
                <div
                    key={place._id}
                    onClick={() => setCurrentPlace(place)}
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