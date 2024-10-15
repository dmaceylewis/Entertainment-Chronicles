import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCollectionById } from "../../services/CollectionsService.jsx";
import { getAllSeries } from "../../services/SeriesService.jsx";
import { BookList } from "../books/BookList.jsx";
import { getAllBooks } from "../../services/BooksService.jsx";
import "./collections.css";
import { Breadcrumb, BreadcrumbItem, Button, Col } from "reactstrap";


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
        <Breadcrumb style={{margin: 5}}>
                <BreadcrumbItem
                    href="/"
                    tag="a"
                >
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem
                    href="/Collections"
                    tag="a"
                >
                    Collections
                </BreadcrumbItem>
                <BreadcrumbItem
                    href="`/collection/${collection.id}`"
                    tag="a"
                >
                    {collection.name}
                </BreadcrumbItem>
        </Breadcrumb>
            <h1>{collection?.name}</h1>
            <div>
                <Link to="/collections/series/add" key="series name">
                    <Col>
                        <Button color="info">Add New Series</Button>
                    </Col>
                </Link>
            </div>
            <br />
            {series.length > 0 ? (
                series.filter(s => s.collectionId === collection?.id)
                    .map(seriesItem => (
                        <div key={seriesItem.id}>
                            <div className="series-name">
                                <h3>{seriesItem.name}</h3>
                                <Link to="/collections/series/add-items">
                                    <i className="fa-solid fa-plus" />
                                </Link>
                            </div>
                            <hr/>
                            <BookList series={seriesItem} books={books} />
                            <br/>
                        </div>
                    ))
            ) : (
                <h3>No series in collection</h3>
            )}
    </div>
  );
};