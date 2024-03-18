const Footer = () => {

    const year: number = new Date().getFullYear();

    return (
        <footer className="py-4 text-center grow-0" >
            <p className="text-sm font-bold text-blue-600">Mapper {year} &trade;</p >
        </footer>
    )
}

export default Footer