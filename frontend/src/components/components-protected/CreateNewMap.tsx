import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorMssg } from "../components-misc/ErrorAndSuccess";
import { useMapContext } from "../../hooks/useMapContext";
import { ActionType } from "../../types/mapActions";

const CreateNewMap = () => {

    const location = useLocation();
    const { mapDispatch } = useMapContext();
    const mapData = location.state || null;
    const [desc, setDesc] = useState(mapData ? mapData.description : '');
    const [name, setName] = useState(mapData ? mapData.name : '');
    const [error, setError] = useState('');
    const [hasChanged, setHasChanged] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!name) {
            setError("Name field must be filled out");
            return;
        }
        if (hasChanged) {
            mapDispatch({ type: ActionType.CREATE_MAP, payload: { _id: '', name: "New Map", description: 'New Map Desc', user_id: '' } })
            navigate('/');
        }
    }

    const initialValue = { name: mapData ? mapData.name : '', desc: mapData ? mapData.description : '' };
    useEffect(() => {
        if (name === initialValue.name && desc === initialValue.desc) setHasChanged(false);
        else setHasChanged(true);
    }, [name, desc])

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { if (inputRef.current) inputRef.current.focus() }, [])

    const twClasses: string = `flex px-12 flex-col border text-sm text-gray-500
    w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up`

    return (
        <div className={twClasses}>
            <h2 className="mb-3 font-bold text-blue-600 text-md">{mapData ? "Edit Map" : "Create New Map"}</h2>
            <form id="newmapform" onSubmit={handleSubmit}>
                <div className="relative">
                    <label className="text-sm" htmlFor="">Map Name</label>
                    <input ref={inputRef} value={name} maxLength={30} onChange={(e) => setName(e.target.value)} className="w-full p-2 mt-1 text-xs border rounded shadow-sm" type="text" />
                    <span className="absolute top-[34px] right-[10px] text-gray-300 text-xs">{`${name.length}/30`}</span>
                </div>
                <div className="relative mt-4">
                    <label className="" htmlFor="">Map Description</label>
                    <span className="italic text-gray-300"> - optional</span>
                    <input value={desc} maxLength={50} onChange={(e) => setDesc(e.target.value)} className="w-full p-2 mt-1 text-xs border rounded shadow-sm" type="text" />
                    <span className="absolute top-[34px] right-[10px] text-gray-300 text-xs">{`${desc.length}/50`}</span>
                </div>
                <div className="flex gap-2 my-6">
                    <Link to='/' className="w-full">
                        <button className="w-full px-4 py-2 border rounded shadow-sm hover:bg-gray-50">Cancel</button>
                    </Link>
                    <button disabled={!hasChanged} form="newmapform" className="w-full px-4 py-2 text-white bg-blue-500 border rounded shadow-sm disabled:bg-blue-300 hover:bg-blue-600">{mapData ? 'Save' : "Create Map"}</button>
                </div>
                {error && <ErrorMssg mssg={error} />}
            </form >
        </div >
    )
}

export default CreateNewMap