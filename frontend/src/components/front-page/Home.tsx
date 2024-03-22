import { useEffect } from "react"
import MapContainer from "../map/MapContainer"
import ExampleMaps from "./ExampleMaps"
import HeadingAndButton from "./HeadingAndButton"
import TextBlock from "./TextBlock"
import UpcomingFeatures from "./UpcomingFeatures"
import { examplePlaces } from "./exampleData"
import { useMapStateContext } from "../../hooks/map-state/useMapStateContext"
import { MapStateActionType } from "../../types/mapStateActions"

const Home = () => {

    const { mapStateDispatch } = useMapStateContext();

    useEffect(() => {
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false })
    }, [])

    return (
        <div className="flex flex-col items-center w-full gap-32 my-16">
            <HeadingAndButton heading="Remember The Places That Matter" btnText="Get Started For Free" showBtn={true} fontSize="text-4xl">
                <p className="w-full text-sm font-medium leading-8 text-center text-blue-600">Create and explore your own maps.</p>
            </HeadingAndButton>
            <MapContainer places={examplePlaces} map_id='none' />
            <TextBlock showFirst={true} />
            <ExampleMaps />
            <TextBlock showFirst={false} />
            <UpcomingFeatures />
            <HeadingAndButton heading="Get Started Right Away" btnText="Sign Up" showBtn={true} fontSize="text-2xl" />
        </div>
    )
}

export default Home