import { ReactNode, createContext, useReducer } from "react";
import { Places } from "../types/placeTypes";
import { PlaceActions, PlaceActionType } from "../types/placeActions";

const placeReducer = (places: Places, action: PlaceActions) => {

    let updatedPlaces: Places = [];
    switch (action.type) {

        case (PlaceActionType.SET_PLACES):
            return action.payload;

        case (PlaceActionType.CREATE_PLACE || PlaceActionType.DUPLICATE_PLACE):
            return [...places, action.payload];

        case (PlaceActionType.DELETE_PLACE):
            updatedPlaces = places.filter(place => place._id !== action.payload);
            return updatedPlaces;

        case (PlaceActionType.UPDATE_PLACE):
            updatedPlaces = places.map(place => place._id === action.payload.id
                ? { ...place, ...action.payload.updatedProps } : place)
            return updatedPlaces;

        default:
            return places;
    }
}

type PlaceContextType = { places: Places, placeDispatch: React.Dispatch<PlaceActions> };
const initialContext: PlaceContextType = { places: [], placeDispatch: () => { } };

export const PlaceContext = createContext<PlaceContextType>(initialContext);
export const PlaceContextProvider = ({ children }: { children: ReactNode }) => {

    const [places, placeDispatch] = useReducer(placeReducer, []);

    return (
        <PlaceContext.Provider value={{ places, placeDispatch }}>
            {children}
        </PlaceContext.Provider>
    )

}