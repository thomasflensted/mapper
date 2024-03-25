// hooks, context and react
import { ReactNode, useRef, useEffect } from "react";
import { useMapStateContext } from '../../hooks/map-state/useMapStateContext';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

// environment variables
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const STYLE = import.meta.env.VITE_MAP_STYLE;


type MapComponentProps = {
    children: ReactNode,
    handleMapClick: (e: mapboxgl.MapLayerMouseEvent) => void,
}

const MapComponent = ({ children, handleMapClick }: MapComponentProps) => {

    // ref - the ref exposes all native MapBox map methods
    const mapRef = useRef<any>(null);
    const { currentPlace, view } = useMapStateContext();

    // fly to place if outside of visible map
    useEffect(() => {
        if (!mapRef || !mapRef.current) return;
        console.log(mapRef.current.getZoom());
        if (currentPlace) {
            const curZoom = mapRef.current.getZoom();
            if (view === 'marker' && curZoom < 12) {
                mapRef.current.flyTo({ center: [currentPlace?.coordinates[0], currentPlace?.coordinates[1]], zoom: 12 })
            } else if (view === 'list') {
                if (curZoom > 13) mapRef.current.flyTo({ center: [currentPlace?.coordinates[0], currentPlace?.coordinates[1]], zoom: curZoom })
                else mapRef.current.flyTo({ center: [currentPlace?.coordinates[0], currentPlace?.coordinates[1]], zoom: 13 });
            }
        }
    }, [currentPlace])

    return (
        <Map
            reuseMaps={true}
            ref={mapRef}
            onClick={(e) => handleMapClick(e)}
            mapboxAccessToken={TOKEN}
            mapStyle={STYLE}
            initialViewState={{ longitude: 15, latitude: 20, zoom: 1.5 }}
            attributionControl={false}>
            {children}
        </Map >
    )
}

export default MapComponent