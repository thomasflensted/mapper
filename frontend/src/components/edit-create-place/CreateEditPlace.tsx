import { NewPlace, Place, PlaceType } from "../../types/placeTypes";
import { forwardRef, useEffect, useState } from "react";
import { usePlaces } from "../../hooks/place-hooks/usePlaces";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import { LabelAndInput, LongInput } from "../global-misc-general/FormComponents"
import { ErrorMssg } from "../global-misc-general/ErrorAndSuccess";
import { Cross2Icon } from "@radix-ui/react-icons";
import TypeDropDown from "./TypeDropDown";
import HaveBeenToggle from "./HaveBeenToggle";
import * as Dialog from '@radix-ui/react-dialog';
import { usePlaceContext } from "../../hooks/place-hooks/usePlaceContext";
import { PlaceActionType } from "../../types/placeActions";
import { useMapStateContext } from "../../hooks/map-state/useMapStateContext";
import { MapStateActionType } from "../../types/mapStateActions";

type DialogProps = {
    map_id: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    place?: Place,
    coordinates: [number, number],
}

const CreateEditPlace = forwardRef(function (props: DialogProps, ref: any) {

    const { mapStateDispatch } = useMapStateContext()
    const { map_id, setOpen, place, coordinates } = props;

    // hooks
    const { user } = useAuthContext();
    const { places, placeDispatch } = usePlaceContext();
    const { error, createPlace, updatePlace, deletePlace } = usePlaces();

    // state
    const [name, setName] = useState<string>(place ? place.name : '');
    const [description, setDescription] = useState<string>(place ? place.description : '');
    const [haveBeen, setHaveBeen] = useState<boolean>(place ? place.have_been : false);
    const [type, setType] = useState<PlaceType>(place ? place.type : 'restaurant');
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    const handleDelete = async () => {
        if (place) await deletePlace(user, place?._id)
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false });
        setOpen(false);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let result: boolean | undefined;
        if (place) {
            result = await updatePlace(user, place._id, { name, description, type })
            if (result) placeDispatch({ type: PlaceActionType.UPDATE_PLACE, payload: { id: place._id, updatedProps: { name, description, type } } });
            const thisPlace = places.find(curPlace => curPlace._id === place._id);
            if (thisPlace) mapStateDispatch({ type: MapStateActionType.SET_PLACE, payload: { ...thisPlace, name, description, type } })
        } else {
            const newPlace: NewPlace = { name, description, coordinates, have_been: false, type, images: [], map_id }
            result = await createPlace(user, newPlace);
            if (result) mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false });
        }
        if (result) setOpen(false);
    }

    const initialValues = {
        name: place ? place.name : '',
        description: place ? place.description : '',
        type: place ? place.type : 'restaurant'
    };

    useEffect(() => {
        if (JSON.stringify(initialValues) === JSON.stringify({ name, description, type })) setHasChanged(false);
        else setHasChanged(true);
    }, [name, description, type])

    const handleClose = () => {
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false });
    }

    return (
        <Dialog.Content ref={ref} className='fixed z-20 w-1/3 translate-x-1/2 bg-white border rounded-lg shadow-lg top-36 right-1/2'>
            <div className="relative w-full h-full p-6">
                <Dialog.Title className="mb-3 text-lg font-bold text-blue-600">{place ? 'Edit Place' : 'Create New Place'}</Dialog.Title>
                <form className="flex flex-col gap-4" id="newplaceform" onSubmit={(e) => handleSubmit(e)}>
                    <LabelAndInput heading='Name' value={name} setter={setName} optional={false} />
                    <LongInput heading="Description" optional={true} setter={setDescription} maxLength={150} value={description} />
                    <TypeDropDown setType={setType} type={type} />
                    <HaveBeenToggle setHaveBeen={setHaveBeen} haveBeen={haveBeen} />
                    <div className="flex gap-2">
                        {place &&
                            <button type="button" onClick={handleDelete} className="w-full text-sm font-medium text-center btn-red">Delete Place</button>}
                        <Dialog.Close onClick={handleClose} className="w-full text-sm font-medium btn-white">Cancel</Dialog.Close>
                        <button type="submit" form="newplaceform" disabled={!hasChanged} onClick={(e) => handleSubmit(e)}
                            className="w-full text-sm font-medium btn-blue disabled:bg-blue-300">{place ? 'Save' : 'Create Place'}</button>
                    </div>
                    {error && <ErrorMssg mssg={error} marginBottom={5} />}
                </form>
                <Dialog.Close>
                    <Cross2Icon className="absolute top-4 right-4" />
                </Dialog.Close>
            </div >
        </Dialog.Content >
    )
})

export default CreateEditPlace