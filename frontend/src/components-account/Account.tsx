import * as Dialog from '@radix-ui/react-dialog';
import UpdatePassword from './accountdialogs/UpdatePassword';
import UpdateName from './accountdialogs/UpdateName';
import UpdateEmail from './accountdialogs/UpdateEmail';
import thomas from '../assets/thomas.webp'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom';

const Account = () => {

    const credentials = [
        { text: "Name", val: "Thomas Flensted", component: <UpdateName /> },
        { text: "Email", val: "thomasflenstedjensen@gmail.com", component: <UpdateEmail /> },
        { text: "Password", val: "•••••••••••••", component: <UpdatePassword /> },
    ]

    const twClasses: string = `flex px-12 flex-col border text-sm text-gray-500
    gap-8 w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up`


    return (
        <div className={twClasses}>
            <span className="overflow m-auto relative animate-scaleup">
                <img className='w-[90px] h-[90px] rounded-full shadow-lg' src={thomas} alt="Rounded avatar" />
                <span className='absolute bottom-[10px] right-[-4px] rounded-full
                shadow-md p-1 bg-white hover:scale-125 transition ease'>
                    <Pencil1Icon className='text-black' />
                </span>
            </span>
            {credentials.map(credential =>
                <div key={credential.text} className="flex justify-between items-center">
                    <div>
                        <h3 className="text-base text-black">{credential.text}</h3>
                        <p className="text-sm text-gray-400">{credential.val}</p>
                    </div>
                    <Dialog.Root>
                        <Dialog.Trigger className="border rounded px-6 py-2 hover:bg-slate-50 hover:scale-105 transition ease">Edit</Dialog.Trigger>
                        {credential.component}
                    </Dialog.Root>
                </div>
            )}
            <Link to='/'>
                <button className="border rounded py-3 w-full text-white font-bold bg-blue-500 hover:bg-blue-600">Close</button>
            </Link>
        </div>
    )
}

export default Account

// <h1 className="font-bold text-lg">Account Details</h1>