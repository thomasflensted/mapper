export function ErrorMssg({ mssg, marginBottom }: { mssg: string, marginBottom: number }) {

    const margin = `mb-${marginBottom}`

    return (
        <div className={`px-2 py-1 border border-red-400 rounded bg-red-50 ${margin}`}>
            <p className="text-sm font-medium text-red-400">{mssg}</p>
        </div>
    )
}

export function SuccessMssg({ mssg, marginBottom }: { mssg: string, marginBottom: number }) {

    const margin = `mb-${marginBottom}`

    return (
        <div className={`p-2 border border-green-500 rounded bg-green-50 ${margin}`}>
            <p className="text-sm font-medium text-green-500">{mssg}</p>
        </div>
    )
}