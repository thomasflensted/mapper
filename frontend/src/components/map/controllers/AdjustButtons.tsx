type BtnProps = {
    handleAdjust: (cancelled: boolean) => void,
}

const AdjustButtons = ({ handleAdjust }: BtnProps) => {
    return (
        <div className='absolute flex gap-2 top-4 left-4'>
            <div className='flex items-center justify-center gap-2 px-4 bg-white border rounded shadow-lg'>
                <p className='font-medium text-blue-600'>Place the marker at your desired place and click save.</p>
            </div>
            <button
                onClick={() => handleAdjust(false)}
                className='px-4 font-bold border-none shadow-lg btn-blue'>Save</button>
            <button
                onClick={() => handleAdjust(true)}
                className='px-4 font-bold text-white bg-red-500 border-none rounded shadow-lg hover:bg-red-600'>Cancel</button>
        </div>
    )
}

export default AdjustButtons