import React, {  createContext, useState,useContext } from 'react';

export const ecomContext = createContext(null);

export const EcomProvider = ({children}) =>{
    const [cart,setCart] = useState([])


    
}


// eslint-disable-next-line react-refresh/only-export-components
export function useEcom(){
    const context=useContext(ecomContext)
    return context
  }
  