import React, { useEffect, useState } from "react";
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';
import { useNavigate, Link, useParams } from "react-router-dom";
import { getAllCollections } from "../../services/CollectionsService";
import { addSeries } from "../../services/SeriesService";
import "../auth/login.css";

export const CreateSeries = () => {
    const [collections, setCollections] = useState([]);
    const [chosenCollection, setChosenCollection] = useState({});

    useEffect(() => {
        getAllCollections().then((allCollections) => setCollections(allCollections));
    }, []);

    {/* Select Collection Dropdown Function */}
    const handleCollectionChoice = (changeEvent) => {
        if (changeEvent.target.id === "collections") {
           setChosenCollection(parseInt(changeEvent.target.value))
        }
    }
    document.addEventListener("change", handleCollectionChoice)


    const [newSeries, setNewSeries] = useState({
        name: ""
    });

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const series = {
      name: newSeries.name,
      collectionId: parseInt(newSeries.collectionId)
    };
    addSeries(series).then(() => {
      navigate("/collection/:id");
    }).catch((error) => {
        console.error("Error creating series:", error);
      });
  };
  

  return (
    <main className="container-collections">
      <section>
        <Form className="form-collection" onSubmit={handleSubmit}>
          <article className="echron-title">
            <h1>Create a Series</h1>
          </article>
          <hr />
          <fieldset>
                <FormGroup row>
                    <Col >
                            <Input
                                id="collections"
                                name="select"
                                type="select"
                                onChange={(event) => {
                                    const collectionCopy = { ...newSeries };
                                    collectionCopy.collectionId = event.target.value;
                                    setNewSeries(collectionCopy);
                                }}
                            >
                                    <option value= '0'>
                                        Select Collection...
                                    </option>

                                {collections.map((collection) => {
                                     return (
                                        <option key={collection.id} value= {collection.id}>
                                            {collection.name}
                                        </option>
                                    )
                                })}
                            </Input>
                    </Col>
                </FormGroup>
              <FormGroup className="form-group">
                <Label for="series" style={{fontFamily: "Fredoka"}}>Series Name</Label>
                <Input 
                  className="login-form-input"
                  id="seriesName" type="text"
                  placeholder="Enter new series name here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const seriesCopy = { ...newSeries };
                    seriesCopy.name = event.target.value;
                    setNewSeries(seriesCopy);
                    }} 
                />
              </FormGroup>
              <section className="button-group">
                <Button className="save-btn" color="warning" outline type="submit" style={{fontFamily: "Fredoka"}}>
                    Add
                </Button>
                <Link to="/Collections">
                    <Button className="cancel-btn" color="success" outline style={{fontFamily: "Fredoka"}}>
                        Cancel
                    </Button>
                </Link>
              </section>
          </fieldset>
        </Form>
      </section>
    </main>
  );
}