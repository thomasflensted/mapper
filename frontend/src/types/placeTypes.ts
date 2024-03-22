export type PlaceType = 'cafe' | 'restaurant' | 'museum' | 'nature' | 'sight' | 'hotel' | 'memory' | 'other';

export type Place = {
    _id: string,
    name: string,
    description: string,
    type: PlaceType,
    have_been: boolean,
    images: string[],
    coordinates: [number, number],
    map_id: string
}

export type NewPlace = {
    name: string,
    description: string,
    coordinates: [number, number],
    have_been: boolean,
    type: PlaceType,
    images: string[],
    map_id: string,
}

export type Places = Place[];