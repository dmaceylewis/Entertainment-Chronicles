import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getCollectionById } from "../../services/CollectionsService.jsx";
import { getAllSeries } from "../../services/SeriesService.jsx";
import { BookList } from "../books/BookList.jsx";
import { getAllBooks } from "../../services/BooksService.jsx";
import "./collections.css";


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
                            <div className="series-name">
                                <h3>{seriesItem.name}</h3>
                                <i className="fa-solid fa-plus" />
                            </div>
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