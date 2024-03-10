import { ReactNode } from "react"
import { Link } from "react-router-dom"

type HeadingAndButtonProps = { heading: string, btnText?: string, children?: ReactNode, showBtn: boolean }

const HeadingAndButton = ({ heading, btnText, children, showBtn }: HeadingAndButtonProps) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-bold text-blue-700">{heading}</h2>
            {children}
            {showBtn && <Link to='/signup'><button className="px-6 text-lg font-bold btn-blue">{btnText}</button></Link>}
        </div>
    )
}

export default HeadingAndButton