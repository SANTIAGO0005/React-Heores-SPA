import React from 'react'
import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

const initialState = {
    logged: false,
}

export const AuthProvider = ({children}) => {

   const[authState,dispatch] = useReducer( authReducer, initialState)

  return (
    <AuthContext.Provider value={{value}}>
            { children }
    </AuthContext.Provider>
  )
}
