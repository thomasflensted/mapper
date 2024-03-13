import { PlaceType } from './placeTypes'

type FilterName = 'Cafés' | 'Restaurants' | 'Museums' | 'Nature' | 'Sights' | 'Hotels' | 'Memories';

export type Filter = {
    name: FilterName,
    value: PlaceType,
    checked: boolean
}

export type Filters = Filter[]