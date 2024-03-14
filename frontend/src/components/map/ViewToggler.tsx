import { motion } from "framer-motion"
import { View } from "../../types/mapTypes";

const ViewToggler = ({ view, setView }: { view: View, setView: React.Dispatch<React.SetStateAction<View>> }) => {

    const handleViewChange = () => {
        view === 'marker' ? setView('list') : setView('marker');
    }

    return (
        <motion.div
            initial={false}
            animate={view === 'marker' ? { x: 0 } : { x: -345 }}
            transition={{ ease: 'easeInOut', duration: .5 }}
            onClick={(handleViewChange)}
            className="absolute flex items-center w-auto gap-2 px-4 py-2 bg-white rounded-full shadow-md cursor-pointer h-7 justify-evenly top-2 right-2">
            <h4 className={`text-xs text-blue-600 ${view === 'list' ? 'font-medium' : 'font-light'}`}>List</h4>
            <div className="box-border relative w-10 h-5 bg-gray-100 border rounded-full">
                <motion.div
                    className="absolute top-0 w-1/2 h-full bg-white rounded-full shadow-sm"
                    animate={view === 'list' ? { x: 0 } : { x: 19 }}
                    transition={{ type: 'tween', duration: .1 }}>
                </motion.div>
            </div>
            <h4 className={`text-xs text-blue-600 ${view === 'marker' ? 'font-medium' : 'font-light'}`}>Marker</h4>
        </motion.div >
    )
}

export default ViewToggler