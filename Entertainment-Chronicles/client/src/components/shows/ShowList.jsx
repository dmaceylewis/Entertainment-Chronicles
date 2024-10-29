import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import "./shows.css";
import { getAllSeasons } from "../../services/ShowsService";

export const ShowList = ({ series, shows }) => {
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
        getAllSeasons().then((allSeasons) => setSeasons(allSeasons));
    }, []);

    return (
        <>
            {shows.length > 0 ? (
                shows.filter(s => s.seriesId === series.id)
                    .map(show => {
                        // Find the corresponding season for the current show
                        const matchedSeason = seasons.find(season => season.id === show.seasonId);

                        return (
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
                                        {matchedSeason ? (
                                            <p>
                                                <strong>{show.order}.</strong> {show.title} - 
                                                Season: {matchedSeason.number} Episode: {matchedSeason.episode}
                                            </p>
                                        ) : (
                                            <p>
                                                <strong>{show.order}.</strong> {show.title}
                                            </p>
                                        )}
                                    </div>
                                    <div className="show-buttons">
                                        <Link to={`/collection/editShow/${show.id}`}>
                                            <Button color="success" outline size="sm">
                                                <i className="fa-regular fa-pen-to-square" />
                                            </Button>
                                        </Link>
                                        <Link to={`/collection/deleteShow/${show.id}`}>
                                            <Button color="danger" outline size="sm">
                                                <i className="fa-regular fa-trash-can" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardBody>
                            </Card>
                            <br/>
                            </>
                        );
                    })
            ) : (
                <h3>No shows found</h3>
            )}
        </>
    );
}
