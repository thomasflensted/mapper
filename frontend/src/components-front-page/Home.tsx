import MapContainer from "../components-map/MapContainer"
import HeadingAndButton from "./HeadingAndButton"
import MapCard from "../components-protected/Mapcard"
import { ReactNode } from "react"

const Home = () => {

    let cards: ReactNode[] = [];
    for (let i = 0; i < 8; i++) {
        cards.push(<MapCard key={i} />)
    }

    return (
        <div className="flex flex-col items-center w-full gap-20 mt-16">
            <HeadingAndButton heading="Remember The Places That Matter" btnText="Get Started For Free" showBtn={true}>
                <p className="w-full text-sm font-medium leading-8 text-center text-blue-600">Create and explore your own maps.</p>
            </HeadingAndButton>
            <MapContainer />
            <p className="w-1/2 font-medium leading-8 text-center text-blue-600 text-md">
                Two lines that descibe the site. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui iste est ullam beatae necessitatibus corporis saepe, architecto consectetur sunt error.
            </p>
            <div className="grid grid-cols-4 gap-4 p-10 border shadow-lg rounded-xl">
                {cards}
            </div>
            <HeadingAndButton heading="Hello World" btnText="Sign Up Now" showBtn={true} />
        </div>
    )
}

export default Home