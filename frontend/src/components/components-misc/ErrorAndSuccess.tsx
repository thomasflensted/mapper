export function ErrorMssg({ mssg }: { mssg: string }) {
    return (
        <div className="px-2 py-1 mb-4 border border-red-400 rounded bg-red-50">
            <p className="text-sm font-medium text-red-400">{mssg}</p>
        </div>
    )
}

export function SuccessMssg({ mssg }: { mssg: string }) {
    return (
        <div className="p-2 mb-4 border border-green-500 rounded bg-green-50">
            <p className="text-sm font-medium text-green-500">{mssg}</p>
        </div>
    )
}