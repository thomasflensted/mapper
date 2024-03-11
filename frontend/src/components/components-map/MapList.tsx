import { useState } from "react";
import { motion } from "framer-motion";
import { Places } from "../../types";
import { capitalizeFirstLetter } from "./PopUpWithInfo";

type MapListProps = {
    places: Places,
    clickedPlace: string,
}

const MapListContainer = ({ places, clickedPlace }: MapListProps) => {

    const [listIsToggled, setListIsToggled] = useState(false);
    const listAnimation = { visible: { x: 0 }, hidden: { x: 340 } };
    const btnAnimation = { listOn: { x: -345 }, listOf: { x: 0 } };
    const transition = { ease: 'easeInOut', stiffness: 100, duration: .5 };

    if (clickedPlace && listIsToggled) {
        const listContainer = document.getElementById('container');
        const selectedPlaceTop = document.getElementById(clickedPlace)?.offsetTop;
        if (selectedPlaceTop) listContainer?.scroll({ left: 0, top: selectedPlaceTop - 15, behavior: 'smooth' });
    }

    return (
        <>
            <motion.button
                initial={false}
                variants={btnAnimation} animate={listIsToggled ? "listOn" : "listOff"} transition={transition}
                onClick={() => setListIsToggled(!listIsToggled)}
                className='absolute z-20 px-4 py-2 text-xs font-medium text-blue-600 bg-white border rounded-full shadow-md top-1 right-1 hover:bg-gray-50'>
                {listIsToggled ? "Hide List" : "Show List"}
            </motion.button>
            <motion.div
                initial={false} variants={listAnimation} animate={listIsToggled ? "visible" : "hidden"} transition={transition} id='container'
                className="absolute right-0 z-10 w-1/4 h-full gap-4 p-4 overflow-y-scroll bg-white shadow-lg">
                {places.map(place =>
                    <div
                        key={place.name}
                        className={`w-full p-4 mb-4 bg-white rounded shadow-sm ${clickedPlace === place.name ? 'border border-blue-600' : 'border'}`} id={place.name}>
                        <h3 className="text-sm font-bold text-blue-600">{place.name}</h3>
                        <p className="text-xs font-light text-gray-400">{capitalizeFirstLetter(place.type)}</p>
                        <p className="pr-1 my-3 text-xs font-medium text-slate-600">{place.description}</p>
                        <div className="flex justify-end gap-1">
                            <button className="px-5 py-1 text-xs font-medium btn-blue">Details</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    )
}

export default MapListContainer;