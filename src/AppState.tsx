import React, { useContext, useReducer } from "react";

////////////////////
// INITIAL STATE
////////////////////

const initialState = {
    url: "localhost:3000",
    token: null,
    username: null
}


////////////////////
// REDUCER
///////////////////
// action = {type: "" ,payload: ...}
type typeState = {
    url: string
    token: string | null
    username: string | null
}

const reducer = (state: any, action: {type:string, payload:any}) => {
    let newState;
    switch(action.type) {
        case "login":
            newState = {...state, ...action.payload}
            console.log(newState)
            return newState
            break
        default:
            return state
    }
}

////////////////////
// AppContext
///////////////////

type AppContextProviderProps = {
    children: React.ReactNode
}
type AppContextType = {
    state: any
    dispatch: React.Dispatch<{
        type: any;
        payload: any
    }>
}
const AppContext = React.createContext({} as AppContextType)

export const AppState = ({children}: AppContextProviderProps) => {
    const [state,dispatch] = useReducer(reducer, initialState);
    return <AppContext.Provider value = {{state,dispatch}}>
        {children}
    </AppContext.Provider>
}

////////////////
// useAppState
///////////////

export const useAppState = () => {
    return useContext(AppContext)
}