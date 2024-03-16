import { IoMdClose } from 'react-icons/io';
import { Popup } from 'react-map-gl';
import { Link } from 'react-router-dom';

type PopUpProps = {
    lat: number,
    lng: number,
    setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>,
}

const PopUpWithSignUpButton = ({ lat, lng, setShowPopUp }: PopUpProps) => {
    return (
        <Popup
            closeOnMove={true}
            offset={5}
            maxWidth='none'
            focusAfterOpen={false}
            closeButton={false}
            key={lat + lng}
            longitude={lng}
            latitude={lat}>
            <div className="relative flex flex-col w-48 gap-2 text-center">
                <IoMdClose onClick={() => setShowPopUp(false)} className='absolute top-[-6px] right-[-6px] text-blue-800' />
                <h2 className="font-bold text-blue-600">Got A Great Memory Here?</h2>
                <Link to='/signup'><button className="w-full px-4 border-0 btn-blue">Sign Up To Save It</button></Link>
            </div>
        </Popup>
    )
}

export default PopUpWithSignUpButton