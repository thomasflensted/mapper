import { PlaceType } from "../../types/placeTypes"

const TypeDropDown = ({ type, setType }: { type: string, setType: React.Dispatch<React.SetStateAction<PlaceType>> }) => {

    return (
        <div className="flex flex-col gap-1">
            <label className='block mr-1 text-xs text-gray-500'>Type:</label>
            <select defaultValue={type} className="bg-white text-input" onChange={(e: any) => setType(e.target.value)}>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Café</option>
                <option value="nature">Nature</option>
                <option value="hotel">Hotel</option>
                <option value="sight">Sight</option>
                <option value="museum">Museum</option>
                <option value="memory">Memory</option>
            </select>
        </div>
    )
}

export default TypeDropDown