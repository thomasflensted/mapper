import { Map, Maps } from './mapTypes'

export enum MapActionType { SET_MAPS, DELETE_MAP, UPDATE_MAP, DUPLICATE_MAP, CREATE_MAP }

type MapID = string;

export interface SET_MAPS {
    type: MapActionType.SET_MAPS,
    payload: Maps,
}

export interface DELETE_MAP {
    type: MapActionType.DELETE_MAP,
    payload: MapID,
}

export interface ADD_MAP {
    type: MapActionType.CREATE_MAP | MapActionType.DUPLICATE_MAP,
    payload: Map,
}

export interface UPDATE_MAP {
    type: MapActionType.UPDATE_MAP,
    payload: {
        id: MapID,
        updatedProps: { name?: string, description?: string }
    }
}

export type MapActions = SET_MAPS | DELETE_MAP | ADD_MAP | UPDATE_MAP;