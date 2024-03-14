import { Cross2Icon } from "@radix-ui/react-icons";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type FormProps = {
    setName: React.Dispatch<string>,
    name: string,
}

export const FormMapName = ({ setName, name }: FormProps) => {

    const NAME_MAX_LENGTH: number = 20;

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { if (inputRef.current) inputRef.current.focus() }, [])

    return (
        <div className="relative">
            <label className="text-xs">Map Name</label>
            <input ref={inputRef} value={name} maxLength={NAME_MAX_LENGTH} onChange={(e) => setName(e.target.value)} className="w-full p-2 mt-1 text-xs border rounded shadow-sm" type="text" />
            <span className="absolute top-[34px] right-[10px] text-gray-300 text-xs">{`${name.length}/${NAME_MAX_LENGTH}`}</span>
        </div>
    )
}

type FormDescProps = {
    desc: string,
    setDesc: React.Dispatch<string>
}

export const FormMapDesc = ({ desc, setDesc }: FormDescProps) => {

    const DESC_MAX_LENGTH: number = 50;

    return (
        <div className="relative mt-4">
            <label className="text-xs">Map Description</label>
            <span className="italic text-gray-300"> - optional</span>
            <input value={desc} maxLength={DESC_MAX_LENGTH} onChange={(e) => setDesc(e.target.value)} className="w-full p-2 mt-1 text-xs border rounded shadow-sm" type="text" />
            <span className="absolute top-[34px] right-[10px] text-gray-300 text-xs">{`${desc.length}/${DESC_MAX_LENGTH}`}</span>
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

export const CloseBtn = () => {
    const navigate = useNavigate();
    return (
        <Cross2Icon onClick={() => navigate('/')} className="absolute top-4 right-4 hover:cursor-pointer" />
    )
}