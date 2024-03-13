export type PlaceType = 'cafe' | 'restaurant' | 'museum' | 'nature' | 'sight' | 'hotel' | 'memory';

export type Place = {
    name: string,
    description: string,
    type: PlaceType,
    images: string[],
    coordinates: [number, number],
    map_id: string
}

export type Places = Place[]