export function ErrorMssg({ mssg }: { mssg: string }) {
    return (
        <div className="bg-red-50 p-2 border rounded border-red-400">
            <p className="text-red-400 font-medium">{mssg}</p>
        </div>
    )
}

export function SuccessMssg({ mssg }: { mssg: string }) {
    return (
        <div className="bg-green-50 p-2 border rounded border-green-500">
            <p className="text-green-500 font-medium">{mssg}</p>
        </div>
    )
}