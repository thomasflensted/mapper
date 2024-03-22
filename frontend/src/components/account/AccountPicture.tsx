import { Pencil1Icon } from "@radix-ui/react-icons"
import { useRef } from "react"
import { FaRegFaceSmile } from "react-icons/fa6";

const AccountPicture = () => {

    const inputref = useRef<HTMLInputElement | null>(null);

    return (
        <div className="relative m-auto overflow animate-scale-up">
            <div className='w-[90px] h-[90px] rounded-full shadow-lg border flex justify-center items-center'>
                <FaRegFaceSmile className="w-6 h-6" />
            </div>
            {/* <img className='w-[90px] h-[90px] rounded-full shadow-lg' src={thomas} /> */}
            <div
                onClick={() => { if (inputref.current) inputref.current.click() }}
                className='border absolute bottom-[10px] right-[-4px] rounded-full shadow-md p-1 bg-white hover:scale-125 transition ease'>
                <Pencil1Icon className='text-black' />
            </div>
            <input className="hidden" accept="image/png, image/jpeg" type="file" ref={inputref} />
        </div>
    )
}

export default AccountPicture