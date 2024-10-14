import React, { useEffect, useState } from "react";
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';
import { useNavigate, Link, useParams } from "react-router-dom";
import { getCollectionById } from "../../services/CollectionsService";
import { addSeries } from "../../services/SeriesService";
import "../auth/login.css";

export const CreateSeries = () => {
  const [name, setName] = useState("");
  const [collection, setCollection] = useState([]);
  const { id } = useParams();

    useEffect(() => {
        getCollectionById(id).then((collectionObj) => {
          setCollection(collectionObj);
        });
    }, [id]);

  const navigate = useNavigate();
  const collectionId = localStorage.getItem("collectionId");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSeries = {
      name,
      collectionId
    };
    addSeries(newSeries).then((c) => {
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
            <h1>Create a Series in {collection?.name}</h1>
          </article>
          <hr />
          <fieldset>
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
                  onChange={e => setName(e.target.value)} 
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