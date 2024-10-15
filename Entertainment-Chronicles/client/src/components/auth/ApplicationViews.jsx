import React from "react";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "../Welcome";


export const ApplicationViews = () => {
  
   return(
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
     );
   
  }