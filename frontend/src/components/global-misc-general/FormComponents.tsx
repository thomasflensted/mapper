import { useNavigate } from "react-router-dom";
import VisibilityIcon from "./VisibilityIcon";
import * as Dialog from '@radix-ui/react-dialog';

type LabelAndInputProps = {
    heading: string,
    value: string
    setter: React.Dispatch<string>
    optional: boolean,
    type?: string
}

export const LabelAndInput = ({ heading, value, setter, optional, type }: LabelAndInputProps) => {

    return (
        <div className="relative">
            <label className="text-xs text-gray-500">{heading}</label>
            {optional && <span className="text-xs italic text-gray-300"> - optional</span>}
            <input
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="text-input"
                type={type ? type : 'text'} />
        </div>
    )
}

type LongInputProps = {
    heading: string,
    value: string
    setter: React.Dispatch<string>
    optional: boolean,
    maxLength: number
}

export const LongInput = ({ heading, value, setter, maxLength }: LongInputProps) => {
    return (
        <div className="relative">
            <label className="text-xs text-gray-600">{heading}</label>
            <textarea
                value={value}
                rows={3}
                maxLength={maxLength}
                onChange={(e) => setter(e.target.value)}
                className="mb-2 resize-none text-input" />
            <span className="absolute right-0 text-[10px] text-gray-300 -bottom-2">{`${value.length}/${maxLength}`}</span>
        </div>
    )
}

type PasswordProps = {
    heading?: string,
    setText: React.Dispatch<string>,
    isVisible: boolean
    setVisibility: React.Dispatch<boolean>,
}

export const PasswordInput = ({ heading, setText, isVisible, setVisibility }: PasswordProps) => {
    return (
        <div className="relative">
            <label className="mr-1 text-xs text-gray-600">{heading ? heading : 'Password'}</label>
            <input
                onChange={(e) => setText(e.target.value)}
                className="text-input"
                type={isVisible ? 'text' : 'password'} />
            <VisibilityIcon visible={isVisible} change={setVisibility} />
        </div>
    )
}

type FormButtonsProps = {
    textButtonTwo: string
}

export const FormButtons = ({ textButtonTwo }: FormButtonsProps) => {

    const navigate = useNavigate();

    return (
        <div className="flex gap-2">
            <div
                onClick={() => navigate('/')}
                className="w-full text-center cursor-pointer btn-white">
                Cancel
            </div>
            <button
                form="newmapform"
                className="w-full btn-blue disabled:bg-blue-300 ">
                {textButtonTwo}
            </button>
        </div>
    )
}

export const DialogButtons = ({ resetFunction }: { resetFunction: () => void }) => {
    return (
        <div className='flex gap-2 mt-2'>
            <Dialog.Close onClick={resetFunction} className='w-full py-1.5 border rounded hover:bg-gray-50'>Cancel</Dialog.Close>
            <button className='w-full py-1.5 text-white bg-blue-500 border rounded hover:bg-blue-600'>Update</button>
        </div>
    )
}