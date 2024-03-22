import { createContext, useReducer, ReactNode } from "react";
import { View } from "../types/mapTypes";
import { Place } from "../types/placeTypes";
import { MapStateActions, MapStateActionType } from "../types/mapStateActions";

type MapState = {
    view: View,
    isAdjustingMarker: boolean,
    currentPlace: Place | null,
    showPopup: boolean,
    mapStateDispatch: React.Dispatch<MapStateActions>
}

const mapStateReducer = (state: MapState, action: MapStateActions) => {

    switch (action.type) {
        case (MapStateActionType.SET_PLACE):
            return { ...state, currentPlace: action.payload }
        case (MapStateActionType.SET_ADJUSTING):
            return { ...state, isAdjustingMarker: action.payload }
        case (MapStateActionType.SET_VIEW):
            return { ...state, view: action.payload }
        case (MapStateActionType.SET_POPUP):
            return { ...state, showPopup: action.payload }
        default:
            return state
    }
}

export const initialContext: MapState = {
    view: 'marker',
    isAdjustingMarker: false,
    currentPlace: null,
    showPopup: false,
    mapStateDispatch: () => { }
}

export const MapStateContext = createContext(initialContext);
export const MapStateContextProvider = ({ children }: { children: ReactNode }) => {

    const [mapState, mapStateDispatch] = useReducer(mapStateReducer, initialContext);

    return (
        <MapStateContext.Provider value={{ ...mapState, mapStateDispatch }}>
            {children}
        </MapStateContext.Provider>
    )

}