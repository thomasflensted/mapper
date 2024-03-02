import { useState } from "react";
import { Link } from "react-router-dom";

const CreateNewMap = () => {

    const [desc, setDesc] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const twClasses: string = `flex px-12 flex-col border text-sm text-gray-500
    w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up`

    return (
        <div className={twClasses}>
            <h2 className="text-blue-600 text-md font-bold mb-3">Create New Map</h2>
            <form id="newmapform" onSubmit={(e) => handleSubmit(e)}>
                <div className="relative">
                    <label className="text-sm" htmlFor="">Map Name</label>
                    <input maxLength={30} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded shadow-sm mt-1" type="text" />
                    <span className="absolute top-[35px] right-[10px] text-gray-300 text-xs">{`${name.length}/30`}</span>
                </div>
                <div className="mt-4 relative">
                    <label className="" htmlFor="">Map Description</label>
                    <span className="text-gray-300 italic"> - optional</span>
                    <input maxLength={50} onChange={(e) => setDesc(e.target.value)} className="w-full border p-2 rounded shadow-sm mt-1" type="text" />
                    <span className="absolute top-[35px] right-[10px] text-gray-300 text-xs">{`${desc.length}/50`}</span>
                </div>
                <div className="mt-6 flex gap-2">
                    <Link to={'/userhome'} className="w-full">
                        <button className="border w-full rounded py-2 px-4 shadow-sm hover:bg-gray-50">Cancel</button>
                    </Link>
                    <button form="newmapform" className="border w-full rounded py-2 px-4 shadow-sm text-white bg-blue-500 hover:bg-blue-600">Create Map</button>
                </div>
            </form >
        </div >
    )
}

export default CreateNewMap