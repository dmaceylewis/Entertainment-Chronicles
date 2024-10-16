import React, { useEffect, useState } from "react";
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Col,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { useNavigate, Link, useParams } from "react-router-dom";
import { getAllCollections } from "../../services/CollectionsService";
import { AddBooks } from "../books/AddBooks";
import { AddShows } from "../shows/AddShows";
import { AddMovies } from "../movie/AddMovies";
import "../auth/login.css";

export const AddToSeries = () => {
    const [collection, setCollection] = useState([]);
    const [chosenSeriesType, setChosenSeriesType] = useState({});

    useEffect(() => {
        getAllCollections().then((allCollections) => setCollection(allCollections));
    }, []);

    {/* Select Series Type Dropdown Function */}
    const handleSeriesTypeChoice = (changeEvent) => {
        if (changeEvent.target.id === "seriesType") {
           setChosenSeriesType(parseInt(changeEvent.target.value))
        }
    }
    document.addEventListener("change", handleSeriesTypeChoice)
  

  return (
    <main className="container-collections">
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
                    href="/collections/series/add"
                    tag="a"
                >
                    New Series
                </BreadcrumbItem>
        </Breadcrumb>
      <section>
        <Form className="form-collection">
          <article className="echron-title">
            <h1>Add to a Series</h1>
          </article>
          <hr />
          <fieldset>
                <FormGroup row>
                    <Col>
                        <Input
                            id="seriesType"
                            name="select"
                            type="select"
                            onChange={handleSeriesTypeChoice}
                        >
                            <option value='0'>Select Series Type...</option>
                            <option value='1'>Book Series</option>
                            <option value='2'>TV Show</option>
                            <option value='3'>Movie</option>
                        </Input>
                    </Col>
                </FormGroup>

                {/* Conditional Rendering of Forms */}
                {chosenSeriesType === 1 && (
                    <div>
                        <AddBooks collection={collection} />
                    </div>
                )}

                {chosenSeriesType === 2 && (
                    <div>
                        <AddShows collection={collection} />
                    </div>
                )}

                {chosenSeriesType === 3 && (
                    <div>
                        <AddMovies collection={collection} />
                    </div>
                )}
          </fieldset>
        </Form>
      </section>
    </main>
  );
}