import { Cross2Icon } from "@radix-ui/react-icons";
import { useNavigate, Link } from "react-router-dom";

type LabelAndInputProps = {
    heading: string,
    value: string
    setter: React.Dispatch<string>
    maxLength: number,
    optional: boolean,
}

export const LabelAndInput = ({ heading, value, setter, maxLength, optional }: LabelAndInputProps) => {

    return (
        <div className="relative">
            <label className="text-xs text-gray-500">{heading}</label>
            {optional && <span className="text-xs italic text-gray-300"> - optional</span>}
            {maxLength <= 30 &&
                <>
                    <input
                        value={value}
                        maxLength={maxLength}
                        onChange={(e) => setter(e.target.value)}
                        className="w-full p-2 mt-0 text-xs border rounded shadow-sm"
                        type="text" />
                    <span className="absolute top-[62px] right-[0px] text-gray-300 text-[10px]">{`${value.length}/${maxLength}`}</span>
                </>
            }
            {maxLength > 30 &&
                <>
                    <textarea
                        value={value}
                        rows={2}
                        maxLength={maxLength}
                        onChange={(e) => setter(e.target.value)}
                        className="w-full p-2 mt-0 mt-1 text-xs border rounded shadow-sm resize-none" />
                    <span className="absolute top-[77px] right-[0px] text-gray-300 text-[10px]">{`${value.length}/${maxLength}`}</span>
                </>
            }
        </div>
    )
}

type FormButtonsProps = {
    hasChanged: boolean,
    textButtonTwo: string
}

export const FormButtons = ({ hasChanged, textButtonTwo }: FormButtonsProps) => {

    const navigate = useNavigate();

    return (
        <div className="flex gap-2">
            <div
                onClick={() => navigate('/')}
                className="w-full text-center cursor-pointer btn-white">
                Cancel
            </div>
            <button
                disabled={!hasChanged}
                form="newmapform"
                className="w-full btn-blue disabled:bg-blue-300 ">
                {textButtonTwo}
            </button>
        </div>
    )
}

export const CloseBtn = ({ route, stateObj }: { route: string, stateObj?: any }) => {

    return (
        <Link to={route} state={stateObj}>
            <Cross2Icon
                className="absolute top-4 right-4 hover:cursor-pointer"
            />
        </Link>
    )
}