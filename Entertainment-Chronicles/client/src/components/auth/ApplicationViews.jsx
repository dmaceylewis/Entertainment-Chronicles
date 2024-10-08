import React from "react";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "../Welcome";


export default function ApplicationViews() {
  
   return(
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
     );
   
  }