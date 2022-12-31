import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Cookies from 'js-cookie'
const user=Cookies.get('user')
const useAuth=()=>{
    if(user){
      return true
    } 
    else {
      return false
    }
}

const  PrivateRoutes=(props) =>{
  const auth=useAuth()
  return auth?<Outlet/>: <Navigate to="/signin"/>
}


export default PrivateRoutes;