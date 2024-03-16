import { IoMdClose } from 'react-icons/io';
import { Popup } from 'react-map-gl';
import * as Dialog from '@radix-ui/react-dialog';
import CreateEditPlace from '../../edit-create-place/CreateEditPlace';
import { useEffect, useRef, useState } from 'react';

type PopUpProps = {
    lat: number,
    lng: number,
    map_id: string,
    setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>,
}

const PopUpWithAddNewButton = ({ lat, lng, map_id, setShowPopUp }: PopUpProps) => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Popup
            closeOnMove={true}
            offset={5}
            maxWidth='none'
            focusAfterOpen={false}
            closeButton={false}
            key={lat + lng}
            longitude={lng}
            latitude={lat}>
            <div className="relative flex flex-col items-center w-40 gap-2">
                <IoMdClose onClick={() => setShowPopUp(false)} className='absolute top-[-6px] right-[-6px] text-blue-800' />
                <h2 className="font-bold text-blue-600">Save New Place Here</h2>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger className="z-50 w-10/12 font-medium border-0 btn-blue">
                        Create Place Here
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className='fixed inset-0 bg-white opacity-50' />
                        <CreateEditPlace setOpen={setOpen} map_id={map_id} coordinates={[lng, lat]} setShowPopUp={setShowPopUp} />
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </Popup >
    )
}

export default PopUpWithAddNewButton

/*
<Link
    state={{ lat, lng }}
    to={`/place/create/${map_id}`}>
    <button className="w-10/12 font-medium border-0 btn-blue">Create Place</button>
</Link>
*/