import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getCollectionById } from "../../services/CollectionsService.jsx";
import { getAllSeries } from "../../services/SeriesService.jsx";
import "./collections.css";
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
        <br/>
        {/* {series.map((ser) => (
          <ul>
           <h3>{ser.name}</h3>
          </ul>
        ))} */}
        {collection.id === series?.collectionId ?
            <h3>{series.name}</h3>
        :
            <h3>Series</h3>
        }
        <hr/>
        <Card
            body
            color="light"
            style={{
                fontFamily: "Fredoka",
                color: 'grey'
            }}
        >
        <CardBody>
            {collection.id === series?.collectionId ?
                <p>{series.name}</p>
            :
                <p>Series</p>
            }
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
    </div>
  );
};