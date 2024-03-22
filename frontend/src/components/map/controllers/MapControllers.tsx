import FiltersExpander from "./FiltersExpander"
import GeoCoder from "./GeoCoder"
import ViewToggler from "./ViewToggler"
import MapList from './MapList';
import { GeolocateControl } from "react-map-gl";

type ControllerTypes = {
    setFilter: any,
    filteredPlaces: any,
}

const MapControllers = ({ setFilter, filteredPlaces }: ControllerTypes) => {
    return (
        <>
            <FiltersExpander setFilter={setFilter} />
            <ViewToggler />
            <GeoCoder />
            <GeolocateControl position='bottom-right' />
            <MapList filteredPlaces={filteredPlaces} />
        </>
    )
}

export default MapControllers