const TextBlock = ({ showFirst }: { showFirst: boolean }) => {
    return (
        <>
            {showFirst && <p className="w-1/2 leading-7 text-center text-blue-600 font-extralight">
                That <span className="font-medium">amazing local restaurant</span> you visited 8 years ago in Larache, Morocco? That <span className="font-medium">beautiful view</span> you've been thinking about since your trip to Kyrgyzstan? That <span className="font-medium">cute hotel</span> in Vientiane, Laos that you're still fantasizing about? Something about not forgetting those places with this app.
            </p>}
            {!showFirst && <p className="w-1/2 leading-7 text-center text-blue-600 font-extralight">
                I am always working on new features for Mapper. I have multiple new features in mind, some of them mentioned below, but if there are features you would like to add to Mapper, just let me know <a className="font-medium" href="mailto: thomasflenstedjensen@gmail.com" type="email">here.</a>
            </p>}
        </>
    )
}

export default TextBlock