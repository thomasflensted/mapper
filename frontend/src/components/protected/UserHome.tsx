import MapCard from "../Mapcard"

const UserHome = () => {

    const cards = [];
    for (let i = 0; i < 5; i++) {
        cards.push(<MapCard />);
    }

    return (
        <div className="flex flex-col items-center mt-10 gap-4 w-full">
            <h2 className="text-blue-700 text-4xl font-bold">Welcome Thomas</h2>
            <p className="text-blue-500 font-md">Explore Your Maps</p>
            <div className="grid grid-cols-3 gap-6 mt-4">
                {cards}
            </div>
        </div>
    )
}

export default UserHome