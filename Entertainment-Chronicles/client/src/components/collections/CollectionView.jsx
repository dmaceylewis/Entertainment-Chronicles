import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getCollectionById } from "../../services/CollectionsService.jsx";
import { getAllSeries } from "../../services/SeriesService.jsx";
import "./collections.css";
import { BookList } from "../books/BookList.jsx";
import { getAllBooks } from "../../services/BooksService.jsx";


export const CollectionView = () => {
    const [collection, setCollection] = useState([]);
    const [series, setSeries] = useState([]);
    const [books, setBooks] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getCollectionById(id).then((collectionObj) => {
          setCollection(collectionObj);
        });
    }, [id]);

    useEffect(() => {
        getAllSeries().then((seriesArr) => {
            setSeries(seriesArr);
        })
    }, []);

    useEffect(() => {
        getAllBooks().then((booksArr) => {
            setBooks(booksArr);
        })
    }, []);
  
  return (
    <div className="container-collections">
            <h1>{collection.name}</h1>
            <br />
            {series.length > 0 ? (
                series.filter(s => s.collectionId === collection.id)
                    .map(seriesItem => (
                        <div key={seriesItem.id}>
                            <h3>{seriesItem.name}</h3>
                            <hr/>
                            <BookList series={seriesItem} books={books} />
                            <br/>
                        </div>
                    ))
            ) : (
                <h3>No series found</h3>
            )}
        </div>
  );
};