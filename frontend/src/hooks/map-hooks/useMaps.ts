import { useState } from "react";
import { useMapContext } from "./useMapContext";
import { User } from "../../types/userTypes";
import { MapActionType } from "../../types/mapActions";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useMaps = () => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mapData, setMapData] = useState<{ name: string, description: string } | null>(null);
    const { mapDispatch } = useMapContext();

    const setLoadingAndError = () => {
        setError('')
        setIsLoading(true)
    }

    const resetLoadingAndError = () => {
        setError('')
        setIsLoading(false)
    }

    const getSingleMap = async (user: User, map_id: string) => {
        setLoadingAndError();
        if (!user) return;
        const response =
            await fetch(`${BASE_URL}/map/${map_id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
        const mapData = await response.json();
        if (!response.ok) {
            setError(mapData.mssg)
        } else {
            setMapData(mapData);
            resetLoadingAndError();
        }
    }

    const getMaps = async (user: User) => {
        setLoadingAndError();
        if (!user) return;
        const response =
            await fetch(`${BASE_URL}/map/user_maps/${user._id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
        const mapData = await response.json();
        if (!response.ok) {
            setError(mapData.mssg)
        } else {
            resetLoadingAndError();
            mapDispatch({ type: MapActionType.SET_MAPS, payload: mapData });
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
            mapDispatch({ type: MapActionType.DELETE_MAP, payload: map_id });
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
            mapDispatch({ type: MapActionType.CREATE_MAP, payload: json });
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
            mapDispatch({ type: MapActionType.UPDATE_MAP, payload: json });
            return true;
        }
    }

    return { getSingleMap, getMaps, deleteMap, createMap, updateMap, duplicateMap, mapData, error, isLoading }
}