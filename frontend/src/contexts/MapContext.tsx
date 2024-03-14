import { ReactNode, createContext, useReducer } from "react";
import { Maps } from "../types/mapTypes";
import { MapActions, MapActionType } from '../types/mapActions'

const mapReducer = (maps: Maps, action: MapActions): Maps => {

    let updatedMaps: Maps = [];
    switch (action.type) {

        case (MapActionType.SET_MAPS):
            return action.payload;

        case (MapActionType.DELETE_MAP):
            updatedMaps = maps.filter(map => map._id !== action.payload);
            return updatedMaps;

        case (MapActionType.CREATE_MAP || MapActionType.DUPLICATE_MAP):
            updatedMaps = [...maps, action.payload]
            return updatedMaps;

        case (MapActionType.UPDATE_MAP):
            updatedMaps = maps.map(map =>
                map._id === action.payload.id ? { ...map, ...action.payload.updatedProps } : map)
            return updatedMaps;

        default:
            return maps;
    }
}

type MapContextType = { maps: Maps, mapDispatch: React.Dispatch<MapActions> }
const initialContext: MapContextType = { maps: [], mapDispatch: () => { } };

export const MapContext = createContext<MapContextType>(initialContext);
export const MapContextProvider = ({ children }: { children: ReactNode }) => {

    const [maps, mapDispatch] = useReducer(mapReducer, []);

    return (
        <MapContext.Provider value={{ maps, mapDispatch }}>
            {children}
        </MapContext.Provider >
    )
}