import React, { useEffect, useState } from "react";
import { Button, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllCollections } from "../../services/CollectionsService.jsx";
import { Collection } from "./Collection.jsx";
import "./collections.css";

export const CollectionsList = () => {
  const [collections, setCollections] = useState([]);

  
  const getCollections = () => {
    getAllCollections().then((allCollections) => setCollections(allCollections));
  };
  
  useEffect(() => {
    getCollections();
  }, []);
  
  return (
    <div className="container-collections">
      <h1>Collections</h1>
      <hr />
      <div>
        <Link to="/collections/add" key="collection name">
          <Col>
            <Button color="info">Add New Collection</Button>
          </Col>
        </Link>
      </div>
      <br />
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