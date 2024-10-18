import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import "./books.css";

export const ShowList = ({series, shows}) => {

    return (
        <>
            {shows.length > 0 ? (
                shows.filter(s => s.seriesId === series.id)
                    .map(show => (
                        <>
                        <Card 
                            key={show.id}
                            className="show-card" 
                            body color="light" 
                            style={{ 
                                fontFamily: "Fredoka", 
                                color: 'grey',
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 10,
                            }}
                        >
                            <CardBody className="show-card-body">
                                <div className="show-info">
                                    <p><strong>{show?.order}.</strong> {show?.title} <em>by {show?.author}</em></p>
                                </div>
                                <div className="show-buttons">
                                    {/* <Link to={`/collection/${book.id}`}>
                                        <Button color="info" outline size="sm">
                                            <i className="fa-solid fa-eye" />
                                        </Button>
                                    </Link> */}
                                    <Link to={`/collection/edit/${show.id}`}>
                                        <Button color="success" outline size="sm">
                                            <i className="fa-regular fa-pen-to-square" />
                                        </Button>
                                    </Link>
                                    <Link to={`/collection/delete/${show.id}`}>
                                        <Button color="danger" outline size="sm">
                                            <i className="fa-regular fa-trash-can" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                        <br/>
                        </>
                    ))
            ) : (
                <h3>No shwos found</h3>
            )}
        </>
    )
}