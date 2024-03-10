import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface RowProps { title: string, placeholder: string, component: ReactNode }

const AccountRow = ({ title, placeholder, component }: RowProps) => {

    return (
        <div className="flex justify-between">
            <div>
                <h3 className="text-sm text-black">{title}</h3>
                <p className="text-sm text-gray-400">{placeholder}</p>
            </div>
            <Dialog.Root>
                <Dialog.Trigger className="px-6 py-2 transition border rounded hover:bg-slate-50 hover:scale-105 ease">Edit</Dialog.Trigger>
                {component}
            </Dialog.Root>
        </div>
    )
}

export default AccountRow