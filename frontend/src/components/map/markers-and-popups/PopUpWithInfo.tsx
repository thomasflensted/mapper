import { Popup } from "react-map-gl"
import { IoMdClose } from "react-icons/io";
import { Place } from "../../../types/placeTypes";
import * as Dialog from '@radix-ui/react-dialog';
import CreateEditPlace from "../../edit-create-place/CreateEditPlace";
import { useState } from "react";
import { MapStateActionType } from "../../../types/mapStateActions";
import { useAuthContext } from "../../../hooks/user-hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useMapStateContext } from "../../../hooks/map-state/useMapStateContext";

type PopUpProps = {
    place: Place,
    setUpdatedPosition: React.Dispatch<React.SetStateAction<{
        lng: number;
        lat: number;
    }>>,
}

export const capitalizeFirstLetter = (txt: string) => { return txt.substring(0, 1).toUpperCase() + txt.substring(1, txt.length) }

const PopUpWithInfo = ({ place, setUpdatedPosition }: PopUpProps) => {

    const { mapStateDispatch } = useMapStateContext();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const { user } = useAuthContext();

    const handleAdjustMarkerLocation = () => {
        setUpdatedPosition({ lng: place.coordinates[0], lat: place.coordinates[1] });
        mapStateDispatch({ type: MapStateActionType.SET_ADJUSTING, payload: true });
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false });
    }

    const handleClose = () => {
        mapStateDispatch({ type: MapStateActionType.SET_PLACE, payload: null });
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false });
    }

    return (
        <Popup
            anchor="bottom"
            offset={15}
            maxWidth='none'
            closeButton={false}
            focusAfterOpen={false}
            key={place._id}
            longitude={place.coordinates[0]}
            latitude={place.coordinates[1]} >
            <div className={`absolute bottom-0 px-4 pt-3 pb-4 -translate-x-1/2 bg-white rounded-md shadow-lg ${place.description.length > 100 ? 'w-72' : 'w-60'}`}>
                <div className="flex items-center w-full">
                    <h2 className="flex-grow overflow-hidden font-medium text-blue-600 whitespace-nowrap text-ellipsis">{place.name}</h2>
                    <IoMdClose className="ml-3" onClick={handleClose} />
                </div>
                <hr className="border-[0.5px] border-gray-200 mt-1" />
                <p className="text-[11px] text-gray-400 font-light">{capitalizeFirstLetter(place.type)}</p>
                <p className="font-light text-gray-700">{place.description}</p>
                {user && <div className="flex justify-end gap-1 mt-2">
                    <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                        <Dialog.Trigger className="px-3 py-0.5 btn-white">Edit</Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className='fixed inset-0 bg-white opacity-50' />
                            <CreateEditPlace
                                map_id={place.map_id}
                                coordinates={place.coordinates}
                                place={place}
                                setOpen={setDialogIsOpen} />
                        </Dialog.Portal>
                    </Dialog.Root>
                    <button onClick={handleAdjustMarkerLocation} className="px-3 py-0.5 btn-white">Adjust Location</button>
                </div>}
                {!user &&
                    <div className="flex w-full mt-2">
                        <Link onClick={() => mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false })} className="px-3 py-0.5 btn-white w-full text-center" to='/signup'>
                            Sign Up To Get Started
                        </Link>
                    </div>}
            </div>
        </Popup >
    )
}

export default PopUpWithInfo