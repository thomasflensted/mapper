import { Pencil1Icon } from "@radix-ui/react-icons"
import thomas from '../../assets/thomas.webp'
import { useRef } from "react"

const AccountPicture = () => {

    const inputref = useRef<HTMLInputElement | null>(null);

    return (
        <div className="relative m-auto overflow animate-scale-up">
            <img className='w-[90px] h-[90px] rounded-full shadow-lg' src={thomas} />
            <div
                onClick={() => { if (inputref.current) inputref.current.click() }}
                className='absolute bottom-[10px] right-[-4px] rounded-full shadow-md p-1 bg-white hover:scale-125 transition ease'>
                <Pencil1Icon className='text-black' />
            </div>
            <input className="hidden" accept="image/png, image/jpeg" type="file" ref={inputref} />
        </div>
    )
}

export default AccountPicture