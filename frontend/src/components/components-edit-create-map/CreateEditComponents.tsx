import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type FormProps = {
    setName: React.Dispatch<string>,
    name: string,
}

export const FormMapName = ({ setName, name }: FormProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { if (inputRef.current) inputRef.current.focus() }, [])

    return (
        <div className="relative">
            <label className="text-sm" htmlFor="">Map Name</label>
            <input ref={inputRef} value={name} maxLength={30} onChange={(e) => setName(e.target.value)} className="w-full p-2 mt-1 text-xs border rounded shadow-sm" type="text" />
            <span className="absolute top-[34px] right-[10px] text-gray-300 text-xs">{`${name.length}/30`}</span>
        </div>
    )
}

type FormDescProps = {
    desc: string,
    setDesc: React.Dispatch<string>
}

export const FormMapDesc = ({ desc, setDesc }: FormDescProps) => {
    return (
        <div className="relative mt-4">
            <label className="" htmlFor="">Map Description</label>
            <span className="italic text-gray-300"> - optional</span>
            <input value={desc} maxLength={50} onChange={(e) => setDesc(e.target.value)} className="w-full p-2 mt-1 text-xs border rounded shadow-sm" type="text" />
            <span className="absolute top-[34px] right-[10px] text-gray-300 text-xs">{`${desc.length}/50`}</span>
        </div>
    )
}

type FormButtonsProps = {
    hasChanged: boolean,
    isNewMap: boolean,
}

export const FormButtons = ({ hasChanged, isNewMap }: FormButtonsProps) => {

    const navigate = useNavigate();

    return (
        <div className="flex gap-2 my-6">
            <div
                onClick={() => navigate('/')}
                className="w-full text-center cursor-pointer btn-white">
                Cancel
            </div>
            <button
                disabled={!hasChanged}
                form="newmapform"
                className="w-full btn-blue disabled:bg-blue-300 ">
                {isNewMap ? 'Create Map' : "Save"}
            </button>
        </div>
    )
}