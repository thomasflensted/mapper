import MapCardMock from "./MapCardMock"
import { maps } from "../../exampleData"

const ExampleMaps = () => {

    return (
        <div
            className="grid grid-cols-4 gap-6 p-10 border shadow-lg rounded-xl">
            {maps.map(map =>
                <MapCardMock
                    key={map.name}
                    title={map.name}
                    desc={map.description}
                />)}
        </div>
    )
}

export default ExampleMaps