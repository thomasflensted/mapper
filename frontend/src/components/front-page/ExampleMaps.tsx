import { useMemo } from "react"
import MapCardMock from "./MapCardMock"
import { maps } from "./exampleData"

const ExampleMaps = () => {

    const Memoized = useMemo(() =>
        maps.map(map =>
            <MapCardMock
                key={map._id}
                title={map.name}
                desc={map.description}
            />
        ), [])

    return (
        <div
            className="grid grid-cols-4 gap-6 p-10 border shadow-lg rounded-xl">
            {Memoized}
        </div>
    )
}

export default ExampleMaps