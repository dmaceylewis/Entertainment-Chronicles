import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./collections.css";

export const Collection = ({ collection }) => {
  
  return (
    <Card
        body
        color="light"
        className="collection-card"
        style={{
            fontFamily: "Fredoka",
            color: 'grey'
        }}
    >
      <CardBody className="collection-card-body">
        <div className="collection-info">
            <h3>{collection.name}</h3>
        </div>
        <div className="collection-buttons">
            <Link to={`/collection/${collection.id}`}>
                <Button color="info" outline size="sm">
                    <i className="fa-solid fa-eye" />
                </Button>
            </Link>
            <Link to={`/collection/edit/${collection.id}`}>
                <Button color="success" outline size="sm">
                    <i className="fa-regular fa-pen-to-square" />
                </Button>
            </Link>
            <Link to={`/collection/delete/${collection.id}`}>
                <Button color="danger" outline size="sm">
                    <i className="fa-regular fa-trash-can" />
                </Button>
            </Link>
        </div>
      </CardBody>
    </Card>
  );
};