import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import "./books.css";

export const BookList = ({series, books}) => {

    return (
        <>
            {books.length > 0 ? (
                books.filter(b => b.seriesId === series.id)
                    .map(book => (
                        <>
                        <Card 
                            key={book.id}
                            className="book-card" 
                            body color="light" 
                            style={{ 
                                fontFamily: "Fredoka", 
                                color: 'grey',
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 10,
                            }}
                        >
                            <CardBody className="book-card-body">
                                <div className="book-info">
                                    <p><strong>{book?.order}.</strong> {book?.title} <em>by {book?.author}</em></p>
                                </div>
                                <div className="book-buttons">
                                    <Link to={`/collection/${book.id}`}>
                                        <Button color="info" outline size="sm">
                                            <i className="fa-solid fa-eye" />
                                        </Button>
                                    </Link>
                                    <Link to={`/collection/edit/${book.id}`}>
                                        <Button color="success" outline size="sm">
                                            <i className="fa-regular fa-pen-to-square" />
                                        </Button>
                                    </Link>
                                    <Link to={`/collection/delete/${book.id}`}>
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
                <h3>No books found</h3>
            )}
        </>
    )
}