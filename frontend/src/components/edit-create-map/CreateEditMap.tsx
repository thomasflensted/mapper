import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorMssg } from "../misc/ErrorAndSuccess";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import { FormMapName, FormMapDesc, FormButtons, CloseBtn } from "./CreateEditComponents";
import { useMaps } from "../../hooks/map-hooks/useMaps";

const CreateNewMap = () => {

    // hooks
    const { error, createMap, updateMap } = useMaps();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    // state
    const mapData = location.state || null;
    const [hasChanged, setHasChanged] = useState(false)
    const [name, setName] = useState(mapData ? mapData.name : '');
    const [desc, setDesc] = useState(mapData ? mapData.description : '');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newMapProps = { name, description: desc }
        let result: boolean | null = false;
        if (mapData) {
            result = await updateMap(user, newMapProps, mapData.id);
        } else {
            result = await createMap(user, newMapProps);
        }
        if (result) navigate('/');
    }

    const initialValue = {
        name: mapData ? mapData.name : '',
        desc: mapData ? mapData.description : ''
    };

    useEffect(() => {
        if (name === initialValue.name && desc === initialValue.desc) setHasChanged(false);
        else setHasChanged(true);
    }, [name, desc])

    return (
        <div className='flex px-12 flex-col border text-sm text-gray-500 w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up relative'>
            <h2 className="mb-3 text-lg font-bold text-blue-600">{mapData ? "Edit Map" : "Create New Map"}</h2>
            <form id="newmapform" onSubmit={(e) => handleSubmit(e)}>
                <FormMapName setName={setName} name={name} />
                <FormMapDesc setDesc={setDesc} desc={desc} />
                <FormButtons hasChanged={hasChanged} isNewMap={mapData ? false : true} />
                {error && <ErrorMssg mssg={error} />}
            </form>
            <CloseBtn />
        </div>
    )
}

export default CreateNewMap