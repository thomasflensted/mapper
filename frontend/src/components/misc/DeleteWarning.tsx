import * as AlertDialog from '@radix-ui/react-alert-dialog';

type deleteWarningProps = {
    text: string,
    btnText: string,
    deleteFunction: () => void;
}

const DeleteWarning = ({ text, btnText, deleteFunction }: deleteWarningProps) => {

    return (
        <AlertDialog.Portal>
            <AlertDialog.Overlay className='fixed inset-0 bg-black opacity-50' />
            <AlertDialog.Content className='fixed flex flex-col w-1/3 gap-4 p-6 -translate-x-1/2 -translate-y-1/2 bg-white border rounded top-1/3 left-1/2'>
                <AlertDialog.Title className='font-bold text-red-600'>Are You Sure?</AlertDialog.Title>
                <AlertDialog.Description className='text-sm'>{text}</AlertDialog.Description>
                <div className='w-full text-right'>
                    <AlertDialog.Cancel className='px-4 mr-2 btn-white'>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action onClick={deleteFunction} className='px-4 btn-red'>{btnText}</AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    )
}

export default DeleteWarning