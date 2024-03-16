import { Popup } from "react-map-gl"
import { IoMdClose } from "react-icons/io";
import { Place } from "../../../types/placeTypes";
import * as Dialog from '@radix-ui/react-dialog';
import CreateEditPlace from "../../edit-create-place/CreateEditPlace";
import { useRef, useState } from "react";

type PopUpProps = {
    place: Place,
    setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>,
}

export const capitalizeFirstLetter = (txt: string) => { return txt.substring(0, 1).toUpperCase() + txt.substring(1, txt.length) }

const PopUpWithInfo = ({ place, setShowPopUp }: PopUpProps) => {

    const [open, setOpen] = useState(false);
    //const style = { background: 'blue', position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', width: '60px' }

    return (
        <Popup
            style={{ display: 'relative' }}
            offset={14}
            maxWidth='none'
            closeButton={false}
            focusAfterOpen={false}
            key={place._id}
            longitude={place.coordinates[0]}
            latitude={place.coordinates[1]}>
            <div className="absolute bottom-0 w-64 px-4 pt-3 pb-4 -translate-x-1/2 bg-white rounded-md shadow-lg">
                <div className="flex items-center w-full">
                    <h2 className="flex-grow overflow-hidden font-medium text-blue-600 whitespace-nowrap text-ellipsis">{place.name}</h2>
                    <IoMdClose className="ml-3" onClick={() => setShowPopUp(false)} />
                </div>
                <hr className="border-[0.5px] border-gray-200 my-1" />
                <p className="font-light text-gray-700">{place.description}</p>
                <div className="flex justify-end gap-1 mt-2">
                    <button className="px-3 py-0.5 btn-white">Edit</button>
                    <button className="px-3 py-0.5 btn-white">Adjust Location</button>
                </div>
            </div>
        </Popup >
    )
}

export default PopUpWithInfo

/*
div>
                        <div className="flex items-center justify-between">
                                <h2 className="font-bold text-blue-600">{place.name}</h2>
                                <div onClick={() => setShowPopUp(false)} className="p-1 rounded-full hover:bg-gray-100">
                                    <IoMdClose />
                                </div>
                        </div>
                        <p className="text-gray-400 text-[11px]">{capitalizeFirstLetter(place.type)}</p>
                        </div>
                        <hr className="border-[0.5px] border-blue-200" />
                        <p className="font-normal text-justify text-gray-700">{place.description}</p>
                        <div className="flex justify-end w-full">
                            <Dialog.Root open={open} onOpenChange={setOpen}>
                                <button className="w-2/4 btn-white py-0.5 mr-2">Adjust Location</button>
                                <Dialog.Trigger className="w-1/4 btn-white py-0.5 text-center">Edit</Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className='fixed inset-0 bg-white opacity-50' />
                                    <CreateEditPlace
                                        map_id={place.map_id}
                                        coordinates={place.coordinates}
                                        place={place}
                                        setOpen={setOpen}
                                        setShowPopUp={setShowPopUp} />
                                </Dialog.Portal>
                            </Dialog.Root>
                        </div>
            */