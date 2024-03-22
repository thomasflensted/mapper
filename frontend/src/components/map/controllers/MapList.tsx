import { motion } from "framer-motion";
import { Place, Places } from "../../../types/placeTypes";
import { capitalizeFirstLetter } from "../markers-and-popups/PopUpWithInfo";
import { MapStateActionType } from "../../../types/mapStateActions";
import { useMapStateContext } from "../../../hooks/map-state/useMapStateContext";
import * as Dialog from '@radix-ui/react-dialog'
import CreateEditPlace from "../../edit-create-place/CreateEditPlace";
import { useEffect, useState } from "react";

const MapListContainer = ({ filteredPlaces }: { filteredPlaces: Places }) => {

    const { currentPlace, view, mapStateDispatch } = useMapStateContext();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const listAnimation = { visible: { x: 0 }, hidden: { x: 340 } };
    const transition = { ease: 'easeInOut', duration: .5 };

    const scrollIntoView = (id: string) => {
        const container = document.getElementById('container');
        const selectedElement = document.getElementById(id);
        if (!container || !selectedElement) return;
        const containerBounds = container.getBoundingClientRect();
        const selectedElementBounds = selectedElement.getBoundingClientRect();
        if (selectedElementBounds.top < containerBounds.top) {
            container.scroll({ left: 0, top: selectedElement.offsetTop - 15, behavior: 'smooth' });
        } else if (selectedElementBounds.bottom > containerBounds.bottom) {
            const bottomOffset = container.scrollTop + selectedElementBounds.bottom - containerBounds.bottom + 15;
            container.scroll({ left: 0, top: bottomOffset, behavior: 'smooth' });
        }
    }

    useEffect(() => {
        if (currentPlace && view === 'list') scrollIntoView(currentPlace._id)
    }, [currentPlace, view])

    return (
        <motion.div
            initial={false} variants={listAnimation} animate={view === 'list' ? "visible" : "hidden"} transition={transition} id='container'
            className="absolute right-0 z-10 w-1/4 h-full gap-4 p-4 overflow-y-scroll bg-white shadow-lg">
            <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                {filteredPlaces.map((place: Place) =>
                    <div
                        key={place._id}
                        onClick={() => mapStateDispatch({ type: MapStateActionType.SET_PLACE, payload: place })}
                        className={`w-full p-4 mb-4 bg-white rounded shadow-sm ${currentPlace?._id === place._id ? 'border border-blue-600' : 'border'}`} id={place._id}>
                        <h3 className="text-sm font-bold text-blue-600">{place.name}</h3>
                        <p className="text-xs font-light text-gray-400">{capitalizeFirstLetter(place.type)}</p>
                        <p className="pr-1 my-3 text-xs font-medium text-slate-600">{place.description}</p>
                        <div className="flex justify-end gap-1">
                            <button onClick={() => mapStateDispatch({ type: MapStateActionType.SET_ADJUSTING, payload: true })}
                                className="px-5 py-1 text-xs font-medium btn-white">Adjust Location</button>
                            <Dialog.Trigger className="px-3 py-0.5 btn-blue">Edit</Dialog.Trigger>
                        </div>
                    </div>
                )}
                <Dialog.Portal>
                    {currentPlace &&
                        <>
                            <Dialog.Overlay className='fixed inset-0 z-20 bg-white opacity-50' />
                            <CreateEditPlace
                                map_id={currentPlace.map_id}
                                coordinates={currentPlace.coordinates}
                                place={currentPlace}
                                setOpen={setDialogIsOpen} />
                        </>}
                </Dialog.Portal>
            </Dialog.Root>
        </motion.div>
    )
}

export default MapListContainer;