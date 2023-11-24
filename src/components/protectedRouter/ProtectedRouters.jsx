import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouters = ({children, curUser, tokn}) => {
   const navigate = useNavigate()
   if(!tokn){
    navigate('/signin')
   }
  return children
}

export default ProtectedRouters