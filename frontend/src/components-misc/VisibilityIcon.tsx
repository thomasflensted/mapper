import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons'

const VisibilityIcon = ({ visible, change }: { visible: boolean, change: Function }) => {
    return visible
        ? (<EyeOpenIcon onClick={() => change(!visible)} className='eye-icon' />)
        : (<EyeNoneIcon onClick={() => change(!visible)} className='eye-icon' />)
}

export default VisibilityIcon