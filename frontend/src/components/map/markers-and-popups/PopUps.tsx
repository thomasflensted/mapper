import { useMapStateContext } from "../../../hooks/map-state/useMapStateContext"
import { useAuthContext } from "../../../hooks/user-hooks/useAuthContext"
import PopUpWithAddNewButton from "./PopUpWithAddNewButton"
import PopUpWithInfo from "./PopUpWithInfo"
import PopUpWithSignUpButton from "./PopUpWithSignUpButton"

type PopUpTypes = {
    map_id: string,
    coords: { lng: number, lat: number }
    setUpdatedPosition: React.Dispatch<React.SetStateAction<{
        lng: number;
        lat: number;
    }>>,
}

const PopUps = ({ map_id, coords, setUpdatedPosition }: PopUpTypes) => {

    const { currentPlace, view } = useMapStateContext();
    const { user } = useAuthContext();
    if (currentPlace && view !== 'list') return (<PopUpWithInfo place={currentPlace} setUpdatedPosition={setUpdatedPosition} />)
    if (user && !currentPlace) return (<PopUpWithAddNewButton map_id={map_id} coords={coords} />)
    if (!user && !currentPlace) return (<PopUpWithSignUpButton coords={coords} />)
}

export default PopUps