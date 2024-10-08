import React from "react";
import { Route, Routes } from "react-router-dom";

export default function ApplicationViews() {
  
   return(
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
     );
   
  }