// components
import UpdateName from './accountdialogs/UpdateName';
import UpdateEmail from './accountdialogs/UpdateEmail';
import UpdatePassword from './accountdialogs/UpdatePassword';
import AccountRow from './AccountRow';
import { ErrorMssg, SuccessMssg } from '../components-misc/ErrorAndSuccess';
import { Link } from 'react-router-dom';

// react
import { useState } from 'react';

// hooks
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext';
import { useLogout } from '../../hooks/user-hooks/useLogout';
import DeleteDropDown from './DeleteDropDown';
import AccountPicture from './AccountPicture';


const Account = () => {

    // state
    const [nameIsOpen, setNameIsOpen] = useState(false);
    const [emailIsOpen, setEmailIsOpen] = useState(false);
    const [passwordIsOpen, setPasswordIsOpen] = useState(false);
    const [deleteError, setDeleteError] = useState('')
    const [success, setSuccess] = useState('');

    // hooks
    const { user } = useAuthContext();
    const { logout } = useLogout();

    return (
        <div className="relative flex px-12 flex-col border text-sm text-gray-500 gap-8 w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up">

            <DeleteDropDown setError={setDeleteError} />

            <AccountPicture />

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
                    <button onClick={logout} className='w-full btn-red'>Log Out</button>
                </div>
                {success && <SuccessMssg mssg={success} />}
                {deleteError && <ErrorMssg mssg={deleteError} />}
            </div>
        </div>
    )
}

export default Account