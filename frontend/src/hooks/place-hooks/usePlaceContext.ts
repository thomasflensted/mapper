import { useContext } from "react";
import { PlaceContext } from "../../contexts/PlaceContext";

export const usePlaceContext = () => {
    const context = useContext(PlaceContext);
    if (!context) throw Error('usePlaceContext must be used within PlaceContextProvider');
    return context;
}