import { Place, Places, PlaceType } from "./placeTypes";

export enum PlaceActionType {
    SET_PLACES,
    DELETE_PLACE,
    UPDATE_PLACE,
    DUPLICATE_PLACE,
    CREATE_PLACE
}

type PlaceID = string;

export interface SET_PLACES {
    type: PlaceActionType.SET_PLACES,
    payload: Places
}

export interface DELETE_PLACE {
    type: PlaceActionType.DELETE_PLACE,
    payload: PlaceID
}

export interface CREATE_PLACE {
    type: PlaceActionType.CREATE_PLACE | PlaceActionType.DUPLICATE_PLACE,
    payload: Place
}
export interface UPDATE_PLACE {
    type: PlaceActionType.UPDATE_PLACE,
    payload: {
        id: PlaceID,
        updatedProps: {
            name?: string,
            description?: string,
            type?: PlaceType,
            coordinates?: [number, number],
        }
    }
}

export type PlaceActions = SET_PLACES | DELETE_PLACE | CREATE_PLACE | UPDATE_PLACE