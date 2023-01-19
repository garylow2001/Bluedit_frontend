import { FC, FunctionComponent, useState } from "react"
import { options } from "./DropDown"
import { Link } from "react-router-dom"
import { useAppState } from "../AppState"

interface NavbarProps {
    handleChangeCategory?(cat:string) : void
    page: string
}

export const Navbar = (props:NavbarProps) => {
    const [CategoryView, setCategoryView] = useState("all")
    const {dispatch} = useAppState()
    const handleClick = (cat:string) => {
        setCategoryView(cat)
        props.handleChangeCategory?.(cat)
    }
    const handleLogout = () => {
        dispatch({type:"logout",payload:{}})
    }

    return <nav className="absolute w-full top-0 left-0 bg-black border-gray-200 px-2 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
            {
            (props.page==="Threads")
            ?<h2 className="text-white text-4xl font-coolvetica"> Threads</h2>
            :
            <Link to="/threads">
                <h2 className="text-white text-4xl font-coolvetica">{"<<<Threads"}</h2>
            </Link>
            }
            {
            (props.page === "Threads")
            ?<ul className="flex items-center">
            <li className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-coolvetica hover:cursor-pointer">
                <div onClick={() => handleClick("all")}>All</div>
            </li>
            {options.map((option)=>
            <li className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-coolvetica hover:cursor-pointer">
                <div key={option.value} onClick={()=> handleClick(option.value)}>{option.label}</div>
            </li>
            )}
            </ul>
            : ""
            }
            <a href="/" className="text-white hover:bg-gray-700 hover:text-lred px-3 py-2 rounded-md text-2xl font-coolvetica hover:cursor-pointer"
            onClick={handleLogout}>Logout</a>
        </div>
    </nav>
}