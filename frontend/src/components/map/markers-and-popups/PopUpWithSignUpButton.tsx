import { IoMdClose } from 'react-icons/io';
import { Popup } from 'react-map-gl';
import { Link } from 'react-router-dom';
import { useMapStateContext } from '../../../hooks/map-state/useMapStateContext';
import { MapStateActionType } from '../../../types/mapStateActions';

type PopUpProps = {
    coords: { lat: number, lng: number },
}

const PopUpWithSignUpButton = ({ coords }: PopUpProps) => {

    const { mapStateDispatch } = useMapStateContext()

    return (
        <Popup
            closeOnMove={true}
            offset={5}
            maxWidth='none'
            focusAfterOpen={false}
            closeButton={false}
            key={coords.lat + coords.lng}
            longitude={coords.lng}
            latitude={coords.lat}>
            <div className="relative flex flex-col w-48 gap-2 text-center">
                <IoMdClose onClick={() => mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false })}
                    className='absolute top-[-6px] right-[-6px] text-blue-800' />
                <h2 className="font-bold text-blue-600">Got A Great Memory Here?</h2>
                <Link to='/signup'><button className="w-full px-4 border-0 btn-blue">Sign Up To Save It</button></Link>
            </div>
        </Popup>
    )
}

export default PopUpWithSignUpButton