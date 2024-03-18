import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorMssg } from "../global-misc-general/ErrorAndSuccess";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import { FormButtons, LabelAndInput } from "../global-misc-general/FormComponents";
import { useMaps } from "../../hooks/map-hooks/useMaps";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMapContext } from "../../hooks/map-hooks/useMapContext";

const CreateNewMap = () => {

    // hooks
    const { error, createMap, updateMap } = useMaps();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    // state
    const { map_id } = useParams();
    const { maps } = useMapContext();
    const thisMap = maps.find(map => map._id === map_id);
    const [hasChanged, setHasChanged] = useState(false)
    const [name, setName] = useState(thisMap ? thisMap.name : '');
    const [description, setDescription] = useState(thisMap ? thisMap.description : '');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newMapProps = { name, description }
        let result: boolean | null = false;
        if (map_id) {
            result = await updateMap(user, newMapProps, map_id);
        } else {
            result = await createMap(user, newMapProps);
        }
        if (result) navigate('/');
    }

    const initialValue = {
        name: thisMap ? thisMap.name : '',
        desc: thisMap ? thisMap.description : ''
    };

    useEffect(() => {
        if (name === initialValue.name && description === initialValue.desc) setHasChanged(false);
        else setHasChanged(true);
    }, [name, description])

    return (
        <div className='flex px-12 flex-col border text-sm text-gray-500 w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up relative'>
            <h2 className="mb-3 text-lg font-bold text-blue-600">{thisMap ? "Edit Map" : "Create New Map"}</h2>
            <form id="newmapform" onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
                <LabelAndInput heading="Name" value={name} setter={setName} maxLength={20} optional={false} />
                <LabelAndInput heading="Description" value={description} setter={setDescription} maxLength={50} optional={true} />
                <FormButtons hasChanged={hasChanged} textButtonTwo={thisMap ? "Save" : "Create Map"} />
                {error && <ErrorMssg mssg={error} marginBottom={2} />}
            </form>
            <Link to='/'>
                <Cross2Icon className="absolute top-4 right-4 hover:cursor-pointer" />
            </Link >
        </div>
    )
}

export default CreateNewMap