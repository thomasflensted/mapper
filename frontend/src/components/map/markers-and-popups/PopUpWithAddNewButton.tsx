import { IoMdClose } from 'react-icons/io';
import { Popup } from 'react-map-gl';
import * as Dialog from '@radix-ui/react-dialog';
import CreateEditPlace from '../../edit-create-place/CreateEditPlace';
import { useEffect, useState } from 'react';
import { MapStateActionType } from '../../../types/mapStateActions';
import { useMapStateContext } from '../../../hooks/map-state/useMapStateContext';

type PopUpProps = {
    coords: { lng: number, lat: number },
    map_id: string,
}

const PopUpWithAddNewButton = ({ map_id, coords }: PopUpProps) => {

    const { mapStateDispatch } = useMapStateContext()
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open) mapStateDispatch({ type: MapStateActionType.SET_VIEW, payload: 'marker' });
    }, [open])

    return (
        <Popup
            closeOnMove={true}
            focusAfterOpen={false}
            offset={5}
            maxWidth='none'
            closeButton={false}
            key={coords.lat + coords.lng}
            latitude={coords.lat}
            longitude={coords.lng}>
            <div className="relative flex flex-col items-center w-40 gap-2">
                <IoMdClose onClick={() => mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false })}
                    className='absolute top-[-6px] right-[-6px] text-blue-800' />
                <h2 className="font-bold text-blue-600">Save New Place Here</h2>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger className="z-50 w-10/12 font-medium border-0 btn-blue">Create Place Here</Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className='fixed inset-0 bg-white opacity-50' />
                        <CreateEditPlace setOpen={setOpen} map_id={map_id} coordinates={[coords.lng, coords.lat]} />
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </Popup>
    )
}

export default PopUpWithAddNewButton