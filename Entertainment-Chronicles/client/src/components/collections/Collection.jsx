import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Collection = ({ collection }) => {
  
  return (
    <Card
        body
        color="light"
        style={{
            fontFamily: "Fredoka",
            color: 'grey'
        }}
    >
      <CardBody>
        <p>
          {collection.name}
        </p>
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
      </CardBody>
    </Card>
  );
};