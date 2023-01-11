import { useState } from "react"
import { options } from "./DropDown"

export const Navbar = (props:{handleChangeCategory: Function}) => {
    const [CategoryView, setCategoryView] = useState("all")
    const handleClick = (cat:string) => {
        setCategoryView(cat)
        props.handleChangeCategory(cat)
    }

    return <nav className="absolute w-full top-0 left-0 bg-black border-gray-200 px-2 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
            <h2 className="text-white text-4xl font-medium"> Threads</h2>
            <ul className="flex items-center">
                <li className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-medium hover:cursor-pointer">
                    <div onClick={() => handleClick("all")}>All</div>
                </li>
                {options.map((option)=>
                <li className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-medium hover:cursor-pointer">
                    <div key={option.value} onClick={()=> handleClick(option.value)}>{option.label}</div>
                </li>
                )}
            </ul>
            <a href="/" className="text-white hover:bg-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-2xl font-medium hover:cursor-pointer">Logout</a>
        </div>
    </nav>
}