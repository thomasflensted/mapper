import * as Dialog from '@radix-ui/react-dialog';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons'
import { useState } from 'react';

const UpdatePassword = () => {

    const [formState, setFormState] = useState([
        { id: 1, text: "New Password", visible: false, valid: true },
        { id: 1, text: "Repeat New Password", visible: false, valid: true },
        { id: 2, text: "Old Password", visible: false, valid: false }
    ])

    const handleVisibility = (id: number) => {
        const updatedForm = formState.map(
            form => form.id === id ? { ...form, visible: !form.visible } : form)
        setFormState(updatedForm);
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed opacity-50 inset-0 bg-black' />
            <Dialog.Content className='flex flex-col w-1/3 gap-4 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded'>
                <Dialog.Title className='text-gray-600 font-bold'>Update Password</Dialog.Title>
                {formState.map(form =>
                    <div key={form.text} className='relative'>
                        <label className='text-sm text-gray-600'>{form.text}</label>
                        <input
                            className="w-full border rounded px-2 py-1 focus:outline-1"
                            type={form.visible ? 'text' : 'password'} />
                        {form.visible
                            ? <EyeOpenIcon
                                onClick={() => handleVisibility(form.id)}
                                className='absolute top-[57%] right-2 text-gray-600' />
                            : <EyeNoneIcon
                                onClick={() => handleVisibility(form.id)}
                                className='absolute top-[57%] right-2 text-gray-600' />}
                    </div>
                )}
                <div className='flex gap-2'>
                    <Dialog.Close className='border rounded w-full py-2 hover:bg-gray-50'>Cancel</Dialog.Close>
                    <Dialog.Close className='border rounded w-full py-2 text-white bg-blue-500 hover:bg-blue-600'>Update</Dialog.Close>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default UpdatePassword