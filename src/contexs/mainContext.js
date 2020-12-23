import React, {createContext, useReducer} from "react";
import {mainReducer} from "../reducers/mainReducer";

export const MainContext = createContext()

const initialState = {
    mine: null,
    failedDelete: "",
}

export const MainProvider = props => {
    const [state, dispatch] = useReducer(mainReducer, initialState)
    const value = {state, dispatch}
    return <MainContext.Provider value={value}> {props.children}</MainContext.Provider>
}

