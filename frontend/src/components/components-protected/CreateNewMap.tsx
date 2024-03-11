import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ErrorMssg } from "../components-misc/ErrorAndSuccess";

const CreateNewMap = () => {

    const location = useLocation();
    const { nameProp, descProp } = location.state;
    const [desc, setDesc] = useState(descProp);
    const [name, setName] = useState(nameProp);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name) {
            setError("Name field must be filled out");
            return;
        }
    }

    const twClasses: string = `flex px-12 flex-col border text-sm text-gray-500
    w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up`

    return (
        <div className={twClasses}>
            <h2 className="mb-3 font-bold text-blue-600 text-md">Create New Map</h2>
            <form id="newmapform" onSubmit={(e) => handleSubmit(e)}>
                <div className="relative">
                    <label className="text-sm" htmlFor="">Map Name</label>
                    <input value={name} maxLength={30} onChange={(e) => setName(e.target.value)} className="w-full p-2 mt-1 text-xs border rounded shadow-sm" type="text" />
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
                    <button form="newmapform" className="w-full px-4 py-2 text-white bg-blue-500 border rounded shadow-sm hover:bg-blue-600">Create Map</button>
                </div>
                {error && <ErrorMssg mssg={error} />}
            </form >
        </div >
    )
}

export default CreateNewMap