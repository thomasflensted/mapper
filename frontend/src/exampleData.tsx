import { Places, Map } from "./types/miscTypes"
export const places: Places = [
    {
        name: 'Via Carota',
        type: 'restaurant',
        description: "Their insalate verde 🤤 To die for! Been too many times to count.",
        images: [],
        coordinates: [-74, 40],
        map_id: '1',
    },
    {
        name: 'Banff National Park',
        type: 'nature',
        description: "Was here with mom and dad back in 2014. Still thinking of the beauty. Gotta go back some day!",
        images: [],
        coordinates: [-116, 51],
        map_id: '2',
    },
    {
        name: 'Where I met Mateo ❤️',
        type: 'memory',
        description: "Where I met Mateo for the first time when some of his friends and some of mine struck up a conversation on a lovely summer night. Want to go back with him.",
        images: [],
        coordinates: [-75, 6],
        map_id: '3',
    },
    {
        name: 'Best breakfast ever!',
        type: 'restaurant',
        description: "Such a good breakfast! Anne and I were here on our long trip in 2023. Loved the zucchini hash brown. Wanna go back. Place is called benedict Café.",
        images: [],
        coordinates: [76.94376, 43.26001],
        map_id: '4',
    },
    {
        name: 'Spirited Away in real life',
        type: 'sight',
        description: "Place with a lot of restaurants and a tower in middle from where you can overlook Osaka in its entirety. The place feels like walking around the fantasy world in Spirited Away.",
        images: [],
        coordinates: [135.50632, 34.65255],
        map_id: '5',
    },
    {
        name: 'Authentic coffee ☕️',
        type: 'cafe',
        description: "Real ethiopian coffee. Busy and feels very real. Get a macchiato like the locals!",
        images: [],
        coordinates: [38.75077, 9.03084],
        map_id: '6',
    },
    {
        name: 'Chiltern Firehouse',
        type: 'hotel',
        description: "Probably the best hotel I've stayed at. Expensive, but worth it. Gotta splurge once in a while, right?",
        images: [],
        coordinates: [-0.15499, 51.51863],
        map_id: '7',
    },
    {
        name: 'Best Art Museum?',
        type: 'museum',
        description: "Visited with mom and dad back in 2012. Remember it as the first time art really 'clicked' for me. Gotta go back to explore again.",
        images: [],
        coordinates: [151.21735, -33.86887],
        map_id: '8',
    },
    {
        name: 'Skeleton Coast',
        type: 'nature',
        description: "Wild place. Still thinking of that time we explored this national park in 70-series Landcruiser. What a dream.",
        images: [],
        coordinates: [12.79347, -19.26697],
        map_id: '9',
    },
    {
        name: 'Magical city',
        type: 'sight',
        description: "Saw some videos of this city on Instagram. Looked like Prince of Persia in real life. Really want to go one day.",
        images: [],
        coordinates: [54.35674, 31.89087],
        map_id: '10',
    },
    {
        name: 'Timbuktu!',
        type: 'memory',
        description: "Feel lucky to have visited this place. Felt like going back in time.",
        images: [],
        coordinates: [-3.00803, 16.77432],
        map_id: '11',
    },
    {
        name: 'Great Coffee',
        type: 'cafe',
        description: "Peter recommended this place after he'd been to Buenos Aires. Should be great.",
        images: [],
        coordinates: [-58.45583, -34.55460],
        map_id: '12',
    },
]

export const maps: Map[] = [
    { name: "Best CPH Restaurants", description: 'Best culinary experiences I had in Copenhagen.', user_id: '1' },
    { name: "Amazing Nature", description: "Seen in real life or online.", user_id: '2' },
    { name: "Cofee Shops", description: 'Cute coffee shops I stumbled upon.', user_id: '3' },
    { name: "Memories", description: 'Never forget these.', user_id: '4' },
    { name: "My Favorite Museums", description: 'Inspiring art and history.', user_id: '5' },
    { name: "Sights That Are Worth It", description: 'Statue Of Liberty, go home.', user_id: '6' },
    { name: "Cute Hotels I Found", description: 'From quaint to extravagant.', user_id: '7' },
    { name: "Best Burgers", description: "Traditional and veggie.", user_id: '8' },
]
