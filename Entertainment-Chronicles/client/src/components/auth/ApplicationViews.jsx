import React from "react";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "../Welcome";
import { CollectionsList } from "../collections/CollectionsList";


export const ApplicationViews = () => {
  
   return(
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/collections" element={<CollectionsList />} />
        </Routes>
     );
   
  }