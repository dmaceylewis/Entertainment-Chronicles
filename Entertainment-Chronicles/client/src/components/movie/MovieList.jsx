import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import "./movies.css";

export const MovieList = ({series, movies}) => {

    return (
        <>
            {movies.length > 0 ? (
                movies.filter(m => m.seriesId === series.id)
                    .map(movie => (
                        <>
                        <Card 
                            key={movie.id}
                            className="movie-card" 
                            body color="light" 
                            style={{ 
                                fontFamily: "Fredoka", 
                                color: 'grey',
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 10,
                            }}
                        >
                            <CardBody className="movie-card-body">
                                <div className="movie-info">
                                    <p><strong>{movie?.order}.</strong> {movie?.title}</p>
                                </div>
                                <div className="movie-buttons">
                                    {/* <Link to={`/collection/${book.id}`}>
                                        <Button color="info" outline size="sm">
                                            <i className="fa-solid fa-eye" />
                                        </Button>
                                    </Link> */}
                                    <Link to={`/collection/edit/${movie.id}`}>
                                        <Button color="success" outline size="sm">
                                            <i className="fa-regular fa-pen-to-square" />
                                        </Button>
                                    </Link>
                                    <Link to={`/collection/delete/${movie.id}`}>
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
                <h3>No movies found</h3>
            )}
        </>
    )
}