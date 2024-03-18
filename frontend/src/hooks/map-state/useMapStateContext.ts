import { useContext } from "react";
import { MapStateContext } from "../../contexts/MapStateContext";

export const useMapStateContext = () => {
    const context = useContext(MapStateContext);
    if (!context) throw Error('useMapStateContext must be used within MapStateContextProvider');
    return context;
}