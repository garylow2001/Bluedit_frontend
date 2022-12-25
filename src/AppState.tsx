import React, { useContext, useReducer } from "react";

////////////////////
// INITIAL STATE
////////////////////

const initialState = {
    url: "localhost:3000",
    token: null,
    username: null,
    user_id: null,
    selected_post_id: null
}


////////////////////
// REDUCER
///////////////////
// action = {type: "" ,payload: ...}

const reducer = (state: any, action: {type:string, payload:any}) => {
    let newState;
    switch(action.type) {
        case "login":
            newState = {...state, ...action.payload}
            console.log(newState) //comment out once done
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