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

const reducer = (state: typeof initialState, action: any) => {
    switch(action.type) {
        case "login":
            // fetch(state.url + "/login", {
            //     method: "post",
            //     headers: {
            //         "Content-type" : "application/json"
            //     },
            //     body: JSON.stringify(action.payload)
            // })
            // .then(response => response.json())
            // .then(user => {
            //     return {
            //         ...state,
            //         token: user.token,
            //         username: user.username
            //     }
            // })
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