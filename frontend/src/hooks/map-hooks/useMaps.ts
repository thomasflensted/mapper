import { useState } from "react";
import { useMapContext } from "./useMapContext";
import { User } from "../../types/userTypes";
import { ActionType } from "../../types/mapActions";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useMaps = () => {

    const [error, setError] = useState('');
    const { mapDispatch } = useMapContext();

    const getMaps = async (user: User) => {
        if (!user) return;
        const response =
            await fetch(`${BASE_URL}/map/user_maps/${user._id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
        const mapData = await response.json();
        if (!response.ok) {
            setError(mapData.mssg)
        } else {
            mapDispatch({ type: ActionType.SET_MAPS, payload: mapData });
        }
    }

    const deleteMap = async (user: User, map_id: string) => {
        if (!user) return;
        const response =
            await fetch(`${BASE_URL}/map/${map_id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
        const mapData = await response.json();
        if (!response.ok) {
            setError(mapData.mssg)
        } else {
            mapDispatch({ type: ActionType.DELETE_MAP, payload: map_id });
        }
    }

    type NewMap = { name: string, description: string };
    const createMap = async (user: User, map: NewMap) => {
        if (!user) return null;
        const response = await fetch(`${BASE_URL}/map`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ ...map, user_id: user._id })
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.mssg)
            return false;
        } else {
            mapDispatch({ type: ActionType.CREATE_MAP, payload: json });
            return true;
        }
    }

    const duplicateMap = async (user: User, map: NewMap) => {
        return createMap(user, map);
    }

    type UpdatedProps = { name?: string, description?: string }
    const updateMap = async (user: User, updatedProps: UpdatedProps, map_id: string) => {
        if (!user) return null;
        const response = await fetch(`${BASE_URL}/map/${map_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedProps)
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.mssg)
            return false;
        } else {
            mapDispatch({ type: ActionType.UPDATE_MAP, payload: json });
            return true;
        }
    }

    return { getMaps, deleteMap, createMap, updateMap, duplicateMap, error }
}