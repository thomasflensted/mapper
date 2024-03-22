import { View } from "./mapTypes"
import { Place } from "./placeTypes"

export enum MapStateActionType { SET_ADJUSTING, SET_VIEW, SET_PLACE, SET_POPUP };

export interface SET_ADJUSTING {
    type: MapStateActionType.SET_ADJUSTING,
    payload: boolean
}

export interface SET_VIEW {
    type: MapStateActionType.SET_VIEW,
    payload: View
}

export interface SET_PLACE {
    type: MapStateActionType.SET_PLACE,
    payload: Place | null
}

export interface SET_POPUP {
    type: MapStateActionType.SET_POPUP,
    payload: boolean,
}

export type MapStateActions = SET_ADJUSTING | SET_VIEW | SET_PLACE | SET_POPUP;