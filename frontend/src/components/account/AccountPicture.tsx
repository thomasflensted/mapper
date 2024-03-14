import { Pencil1Icon } from "@radix-ui/react-icons"
import thomas from '/Users/thomasflensted/Documents/03 PROJECTS/mapper/frontend/src/assets/thomas.webp'

const AccountPicture = () => {
    return (
        <div className="relative m-auto overflow animate-scale-up">
            <img className='w-[90px] h-[90px] rounded-full shadow-lg' src={thomas} />
            <div className='absolute bottom-[10px] right-[-4px] rounded-full shadow-md p-1 bg-white hover:scale-125 transition ease'>
                <Pencil1Icon className='text-black' />
            </div>
        </div>
    )
}

export default AccountPicture