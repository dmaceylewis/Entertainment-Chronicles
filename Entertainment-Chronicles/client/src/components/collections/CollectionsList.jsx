import React, { useEffect, useState } from "react";
import { Button, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllCollections } from "../../services/CollectionsService.jsx";
import { Collection } from "./Collection.jsx";

export const CollectionsList = () => {
  const [collections, setCollections] = useState([]);
  const userTypeId = localStorage.getItem("userTypeId");

  
  const getCollections = () => {
    getAllCollections().then((allCollections) => setCollections(allCollections));
  };
  
  useEffect(() => {
    getCollections();
  }, []);
  
  if (userTypeId !== "1") {
    return null; // Render nothing if the userTypeId is not 1
  }
  
  return (
    <div>
      <h2>Collections</h2>
      {/* <div>
        <Link to="/collections/add" key="collection name">
        <Col>
          <Button color="info">Add New Category</Button>
          </Col>
        </Link>
      </div> */}
      <div>
        {collections.map((collection) => (
          <ul>
            <Collection key={collection.id} getCollections={getCollections} collection={collection} />
          </ul>
        ))}
      </div>
    </div>
  );
};