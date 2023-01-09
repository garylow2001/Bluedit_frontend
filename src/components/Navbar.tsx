import { useState } from "react"
import { options } from "./DropDown"
import "./Navbar.css"

export const Navbar = () => {
    const [CategoryView, setCategoryView] = useState("all")
    const handleClick = (cat:string) => {
        setCategoryView(cat)
    }

    return <nav className="nav">
        <div className="thread-list"> Threads</div>
        <ul>
            <li>
                <div onClick={() => handleClick("all")}>All</div>
            </li>
            {options.map((option)=>
            <li>
                <div onClick={()=> handleClick(option.value)}>{option.label}</div>
            </li>
            )}
        </ul>
        <a href="/" className="logout">Logout</a>
    </nav>
}