const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useState } from "react";
import { User } from "../../types/userTypes";
import { usePlaceContext } from "./usePlaceContext";
import { PlaceActionType } from "../../types/placeActions";

export const usePlaces = () => {

    const { placeDispatch } = usePlaceContext();
    const [error, setError] = useState('');

    const getPlaces = async (user: User, map_id: string) => {

        if (!user) return;
        const response =
            await fetch(`${BASE_URL}/place/map_places/${map_id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
        const json = await response.json();
        if (!response.ok) {
            setError(json.mssg)
        } else {
            placeDispatch({ type: PlaceActionType.SET_PLACES, payload: json });
        }
    }

    return { error, getPlaces }

}