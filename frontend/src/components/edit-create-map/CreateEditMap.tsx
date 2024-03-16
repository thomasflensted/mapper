import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMssg } from "../misc/ErrorAndSuccess";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import { FormButtons, CloseBtn, LabelAndInput } from "../misc/CreateEditComponents";
import { useMaps } from "../../hooks/map-hooks/useMaps";

const CreateNewMap = () => {

    // hooks
    const { error, createMap, updateMap } = useMaps();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    // state
    const { map_id } = useParams();
    const { mapName, mapDescription }: { mapName: string, mapDescription: string } = location.state;
    const [hasChanged, setHasChanged] = useState(false)
    const [name, setName] = useState(mapName);
    const [desc, setDesc] = useState(mapDescription);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newMapProps = { name, description: desc }
        let result: boolean | null = false;
        if (map_id) {
            result = await updateMap(user, newMapProps, map_id);
        } else {
            result = await createMap(user, newMapProps);
        }
        if (result) navigate('/');
    }

    const initialValue = {
        name: mapName,
        desc: mapDescription
    };

    useEffect(() => {
        if (name === initialValue.name && desc === initialValue.desc) setHasChanged(false);
        else setHasChanged(true);
    }, [name, desc])

    return (
        <div className='flex px-12 flex-col border text-sm text-gray-500 w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up relative'>
            <h2 className="mb-3 text-lg font-bold text-blue-600">{mapName ? "Edit Map" : "Create New Map"}</h2>
            <form id="newmapform" onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-8">
                <LabelAndInput heading="Name" value={name} setter={setName} maxLength={20} optional={false} />
                <LabelAndInput heading="Description" value={desc} setter={setDesc} maxLength={50} optional={true} />
                <FormButtons hasChanged={hasChanged} textButtonTwo={mapName ? "Save" : "Create Map"} />
                {error && <ErrorMssg mssg={error} />}
            </form>
            <CloseBtn route='/' />
        </div>
    )
}

export default CreateNewMap