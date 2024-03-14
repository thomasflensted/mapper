import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface RowProps {
    children: ReactNode,
    heading: string
    text: string,
    openState: boolean,
    openController: React.Dispatch<React.SetStateAction<boolean>>,
}

const AccountRow = ({ children, text, heading, openState, openController }: RowProps) => {

    return (
        <div className="flex justify-between">
            <div>
                <h3 className="text-sm text-black">{heading}</h3>
                <p className="text-sm text-gray-400">{text}</p>
            </div>
            <Dialog.Root open={openState} onOpenChange={openController}>
                <Dialog.Trigger className="px-6 py-2 transition border rounded hover:bg-slate-50 hover:scale-105 ease">Edit</Dialog.Trigger>
                {children}
            </Dialog.Root>
        </div>
    )
}

export default AccountRow