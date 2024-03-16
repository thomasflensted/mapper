import { motion } from "framer-motion"

const HaveBeenToggle = ({ haveBeen, setHaveBeen }: { haveBeen: boolean, setHaveBeen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className="items-center justify-center hidden">
            <p className={`text-xs text-gray-600 mr-4 ${haveBeen ? 'font-semibold' : ''}`}>Have Been</p>
            <div onClick={() => setHaveBeen(!haveBeen)} className="box-border relative w-10 h-5 bg-gray-100 border rounded-full">
                <motion.div
                    initial={false}
                    className="absolute top-0 w-1/2 h-full bg-white rounded-full shadow-sm"
                    animate={haveBeen ? { x: 0 } : { x: 19 }}
                    transition={{ type: 'tween', duration: .1 }}>
                </motion.div>
            </div>
            <p className={`text-xs text-gray-600 ml-4 ${!haveBeen ? 'font-semibold' : ''}`}>Want To Go</p>
        </div>
    )
}

export default HaveBeenToggle