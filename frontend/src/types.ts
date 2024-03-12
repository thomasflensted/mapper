export type PlaceType = 'cafe' | 'restaurant' | 'museum' | 'nature' | 'sight' | 'hotel' | 'memory';
type FilterName = 'Cafés' | 'Restaurants' | 'Museums' | 'Nature' | 'Sights' | 'Hotels' | 'Memories';

export type Place = {
    name: string,
    description: string,
    type: PlaceType,
    images: string[],
    coordinates: [number, number],
    map_id: string
}

export type Places = Place[]

export type Map = {
    name: string,
    description: string,
    user_id: string
}

export type Maps = Map[]

export type User = {
    _id: string,
    email: string,
    first_name: string,
    last_name: string,
    profile_picture: string,
    token: string
} | null

export type Filter = {
    name: FilterName,
    value: PlaceType,
    checked: boolean
}

export type Filters = Filter[]

export type View = 'list' | 'marker';