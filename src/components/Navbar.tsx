import { useState } from "react"
import { options } from "./DropDown"

export const Navbar = (props:{handleChangeCategory: Function}) => {
    const [CategoryView, setCategoryView] = useState("all")
    const handleClick = (cat:string) => {
        setCategoryView(cat)
        props.handleChangeCategory(cat)
    }

    return <nav className="nav">
        <div className="thread-list"> Threads</div>
        <ul>
            <li>
                <div onClick={() => handleClick("all")}>All</div>
            </li>
            {options.map((option)=>
            <li>
                <div key={option.value} onClick={()=> handleClick(option.value)}>{option.label}</div>
            </li>
            )}
        </ul>
        <a href="/" className="logout">Logout</a>
    </nav>
}