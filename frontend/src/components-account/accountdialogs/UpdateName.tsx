import * as Dialog from '@radix-ui/react-dialog';

const UpdateName = () => {

    const forms = [
        { text: "First Name" },
        { text: "Last Name" },
    ]

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed opacity-50 inset-0 bg-black' />
            <Dialog.Content className='flex flex-col w-1/3 gap-4 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded'>
                <Dialog.Title className='text-gray-600 font-bold'>Update Name</Dialog.Title>
                {forms.map(form =>
                    <div key={form.text}>
                        <label className='text-sm text-gray-600'>{form.text}</label>
                        <input className="w-full border rounded px-2 py-1 focus:outline-1" type='text' />
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

export default UpdateName