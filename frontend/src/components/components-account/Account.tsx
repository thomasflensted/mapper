import thomas from '/Users/thomasflensted/Documents/03 PROJECTS/mapper/frontend/src/assets/thomas.webp'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom';
import UpdateName from './accountdialogs/UpdateName';
import UpdateEmail from './accountdialogs/UpdateEmail';
import UpdatePassword from './accountdialogs/UpdatePassword';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import AccountRow from './AccountRow';
import { SuccessMssg } from '../components-misc/ErrorAndSuccess';


const Account = () => {

    const [nameIsOpen, setNameIsOpen] = useState(false);
    const [emailIsOpen, setEmailIsOpen] = useState(false);
    const [passwordIsOpen, setPasswordIsOpen] = useState(false);
    const [success, setSuccess] = useState('');
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="flex px-12 flex-col border text-sm text-gray-500 gap-8 w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up">

            <div className="relative m-auto overflow animate-scale-up">
                <img className='w-[90px] h-[90px] rounded-full shadow-lg' src={thomas} />
                <div className='absolute bottom-[10px] right-[-4px] rounded-full shadow-md p-1 bg-white hover:scale-125 transition ease'>
                    <Pencil1Icon className='text-black' />
                </div>
            </div>

            <AccountRow text={`${user?.first_name} ${user?.last_name}`} heading='Name' openState={nameIsOpen} openController={setNameIsOpen}>
                <UpdateName setOpen={setNameIsOpen} setSuccess={setSuccess} />
            </AccountRow>

            <AccountRow text={user ? user.email : ''} heading='Email' openState={emailIsOpen} openController={setEmailIsOpen}>
                <UpdateEmail setOpen={setEmailIsOpen} setSuccess={setSuccess} />
            </AccountRow>

            <AccountRow text='••••••••••••' heading='Password' openState={passwordIsOpen} openController={setPasswordIsOpen}>
                <UpdatePassword setOpen={setPasswordIsOpen} setSuccess={setSuccess} />
            </AccountRow>

            <div className='flex flex-col w-full gap-2'>
                <div className='flex gap-2'>
                    <Link className='w-full' to='/'>
                        <button className="w-full btn-blue">Go To Maps</button>
                    </Link>
                    <button className='w-full btn-red'>Delete Account</button>
                </div>
                <button onClick={handleLogout} className='w-full btn-red'>Log Out</button>
                {success && <SuccessMssg mssg={success} />}
            </div>
        </div>
    )
}

export default Account