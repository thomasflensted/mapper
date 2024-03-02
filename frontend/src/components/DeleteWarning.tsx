import * as AlertDialog from '@radix-ui/react-alert-dialog';

const DeleteWarning = () => {

    return (
        <AlertDialog.Portal>
            <AlertDialog.Overlay className='fixed opacity-50 inset-0 bg-black' />
            <AlertDialog.Content className='flex flex-col w-1/3 gap-4 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded'>
                <AlertDialog.Title className='font-bold text-red-600'>Are You Sure?</AlertDialog.Title>
                <AlertDialog.Description className='text-sm'>The map and all its associated places will be deleted. This action cannot be undone.</AlertDialog.Description>
                <div className='text-right w-full'>
                    <AlertDialog.Cancel className='border rounded px-6 py-2 hover:bg-slate-50'>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action className='border border-red-600 rounded px-6 py-2 ml-2 text-red-600 hover:bg-red-50'>Delete</AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    )
}

export default DeleteWarning