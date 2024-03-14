export type Map = {
    _id: string,
    name: string,
    description: string,
    user_id: string
}

export type Maps = Map[] | [];

export type View = 'list' | 'marker';