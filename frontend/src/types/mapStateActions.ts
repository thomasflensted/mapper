import { View } from "./mapTypes"
import { Place } from "./placeTypes"

export enum MapStateActionType { SET_IS_ADJUSTING_MARKER, SET_VIEW, SET_CURRENT_PLACE };

export interface SET_IS_ADJUSTING_MARKER {
    type: MapStateActionType.SET_IS_ADJUSTING_MARKER,
    payload: boolean
}

export interface SET_VIEW {
    type: MapStateActionType.SET_VIEW,
    payload: View
}

export interface SET_CURRENT_PLACE {
    type: MapStateActionType.SET_CURRENT_PLACE,
    payload: Place | null
}

export type MapStateActions = SET_IS_ADJUSTING_MARKER | SET_VIEW | SET_CURRENT_PLACE;