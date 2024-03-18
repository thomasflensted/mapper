const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useState } from "react";
import { User } from "../../types/userTypes";
import { usePlaceContext } from "./usePlaceContext";
import { PlaceActionType } from "../../types/placeActions";
import { NewPlace, PlaceType } from "../../types/placeTypes";

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

    const createPlace = async (user: User, place: NewPlace) => {

        if (!user) return;
        const response =
            await fetch(`${BASE_URL}/place/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(place)
            });
        const json = await response.json();
        if (!response.ok) {
            setError(json.mssg)
            return false;
        }
        placeDispatch({ type: PlaceActionType.CREATE_PLACE, payload: json.createdPlace });
        return true;
    }

    const updatePlace = async (user: User, place_id: string, updatedProps: { name?: string, description?: string, type?: PlaceType, coordinates?: [number, number] }) => {

        if (!user) return;
        const response =
            await fetch(`${BASE_URL}/place/${place_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProps)
            });
        const json = await response.json();
        if (!response.ok) {
            setError(json.mssg)
            return false;
        }
        placeDispatch({ type: PlaceActionType.UPDATE_PLACE, payload: { id: place_id, updatedProps } });
        return true;
    }

    const deletePlace = async (user: User, place_id: string) => {
        if (!user) return;
        const response =
            await fetch(`${BASE_URL}/place/${place_id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` },
            });
        const json = await response.json();
        if (!response.ok) {
            setError(json.mssg)
            return false;
        }
        placeDispatch({ type: PlaceActionType.DELETE_PLACE, payload: place_id });
        return true;
    }

    return { error, getPlaces, createPlace, updatePlace, deletePlace }

}