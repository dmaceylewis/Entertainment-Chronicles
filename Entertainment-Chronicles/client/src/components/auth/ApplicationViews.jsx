import React from "react";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "../Welcome";
import { CollectionsList } from "../collections/CollectionsList";
import { CollectionView } from "../collections/CollectionView";
import { CreateCollection } from "../collections/CreateCollection";
import { CreateSeries } from "../series/CreateSeries";


export const ApplicationViews = () => {
  
   return(
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/collections" element={<CollectionsList />} />
          <Route path="/collection/:id" element={<CollectionView />} />
          <Route path="/collections/add" element={<CreateCollection />} />
          <Route path="/collections/series/add" element={<CreateSeries />} />
        </Routes>
   );
   
}