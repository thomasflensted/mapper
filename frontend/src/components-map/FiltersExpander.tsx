import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { motion } from "framer-motion"
import { useState } from 'react';
import { Filters, PlaceType } from '../types';

const FiltersExpander = ({ setFilter }: { setFilter: React.Dispatch<React.SetStateAction<PlaceType[]>> }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const animation = {
        initial: { width: 40, height: 40 },
        open: { width: 763, height: 40, transition: { duration: 0.6, ease: [.77, 0, .18, 1] } },
        closed: { width: 40, height: 40 }
    }

    const [filterElements, setFilterElements] = useState<Filters>([
        { name: 'Restaurants', value: 'restaurant', checked: false },
        { name: "Cafés", value: 'cafe', checked: false },
        { name: "Nature", value: 'nature', checked: false },
        { name: "Hotels", value: 'hotel', checked: false },
        { name: "Sights", value: 'sight', checked: false },
        { name: "Museums", value: 'museum', checked: false },
        { name: "Memories", value: 'memory', checked: false },
    ])

    const updateFilter = (updatedFilters: Filters) => {
        const selectedFilters: PlaceType[] = updatedFilters.filter(filterElement => filterElement.checked).map(filterElement => filterElement.value);
        setFilter(selectedFilters);
    }

    const handleChange = (name: string) => {
        const updatedFilters: Filters = filterElements.map(filterElement =>
            filterElement.name === name ? { ...filterElement, checked: !filterElement.checked } : filterElement);
        setFilterElements(updatedFilters);
        updateFilter(updatedFilters);
    }

    const handleDeselect = () => {
        const updatedFilters: Filters = filterElements.map(filterElement => { return { ...filterElement, checked: false } });
        setFilterElements(updatedFilters);
        updateFilter(updatedFilters);
    }

    return (
        <motion.div variants={animation} animate={isExpanded ? "open" : "closed"}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className="absolute border z-10 flex items-center gap-5 p-[12px] overflow-hidden bg-white rounded-full shadow-lg top-2 left-2 justfify-left">
            <DoubleArrowRightIcon className="flex-shrink-0 w-3" />
            {filterElements.map(filterElement =>
                <div key={filterElement.name} className='flex'>
                    <input
                        className='mr-2 border border-black'
                        type="checkbox"
                        checked={filterElement.checked}
                        id={filterElement.name}
                        onChange={() => handleChange(filterElement.name)} />
                    <label
                        className={`text-xs ${filterElement.checked ? 'text-black' : 'text-gray-400'} hover:cursor-pointer whitespace-nowrap hover:text-black`}
                        htmlFor={filterElement.name}>
                        {filterElement.name}
                    </label>
                </div>
            )}
            <button
                onClick={handleDeselect}
                className='px-3 py-1 text-xs border rounded-full whitespace-nowrap hover:bg-gray-50'>
                Deselect All
            </button>
        </motion.div>
    )
}

export default FiltersExpander