import { Popup } from "react-map-gl"
import { IoMdClose } from "react-icons/io";
import { Place } from "../../types/miscTypes";

type PopUpProps = {
    place: Place | null,
    setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>,
}

export const capitalizeFirstLetter = (txt: string) => { return txt.substring(0, 1).toUpperCase() + txt.substring(1, txt.length) }

const PopUpWithInfo = ({ place, setShowPopUp }: PopUpProps) => {

    return (
        <Popup
            offset={14}
            maxWidth='none'
            closeButton={false}
            focusAfterOpen={false}
            key={place?.name}
            longitude={place ? place.coordinates[0] : 0}
            latitude={place ? place.coordinates[1] : 0}>
            <div className="relative flex flex-col gap-2 p-3 w-60">
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-blue-600">{place?.name}</h2>
                        <div onClick={() => setShowPopUp(false)} className="p-1 rounded-full hover:bg-gray-100">
                            <IoMdClose />
                        </div>
                    </div>
                    <p className="text-gray-400 text-[11px]">
                        {place ? capitalizeFirstLetter(place.type) : ''}
                    </p>
                </div>
                <hr className="border-[0.5px] border-blue-200" />
                <p className="font-normal text-justify text-gray-700">{place?.description}</p>
                <button className="py-1 mt-2 font-medium text-blue-600 btn-white">Open</button>
            </div>
        </Popup >
    )
}

export default PopUpWithInfo

/*
<div onClick={() => setShowPopUp(false)} className="absolute top-0 right-0 p-1 rounded-full hover:bg-gray-100">
    <IoMdClose />
</div>
*/