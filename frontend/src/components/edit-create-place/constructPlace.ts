import { PlaceType, NewPlace } from "../../types/placeTypes"


export const constructPlace = (name: string, description: string, coordinates: [number, number], have_been: boolean, type: PlaceType, images: string[], map_id: string): NewPlace => {
    return {
        name,
        description,
        coordinates,
        have_been,
        type,
        images,
        map_id
    }
}