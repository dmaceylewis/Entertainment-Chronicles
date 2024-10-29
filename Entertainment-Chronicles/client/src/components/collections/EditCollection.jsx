import React, { useEffect, useState } from "react";
import { 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Button
} from 'reactstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { editCollection, getAllCollections } from "../../services/CollectionsService";
import "../auth/login.css";

export const EditCollection = () => {
    const { id } = useParams();
    const userId = JSON.parse(localStorage.getItem("User")).id;
    const [collection, setCollection] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllCollections().then((collections) => {
          const collectionToEdit = collections.find(
            (collection) => collection.id === parseInt(id)
          );
          if (collectionToEdit) {
            setCollection(collectionToEdit);
            setName(collectionToEdit.name); // Set initial name
        }
        });
    }, [id]);


    const editCollectionObj = () => {
        
        let collectionCopy = {
            id: collection.id, // Ensure id is included
            name,
            userId
          };
    
        editCollection(collectionCopy).then(() => {
                  navigate(`/collection/${collection.id}`);
                }).catch((error) => {
                    console.error("Error editing collection:", error);
                });
    }
  

  return (
    <main className="container-collections">
      <section className="form-collection">
          <article className="echron-title">
            <h3>Edit Collection: {collection.name}</h3>
          </article>
          <hr />
          <Form>
            <fieldset>
              <FormGroup className="form-group">
                <Label for="collectionName" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Collection Name</Label>
                <Input 
                  className="login-form-input"
                  id="collectionName" type="text"
                  value={name}
                  placeholder={collection.name}
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => setName(event.target.value)}
                />
              </FormGroup>
          </fieldset>
        </Form>

        <Button color="primary" style={{fontFamily: "Fredoka"}} onClick={() => editCollectionObj()}>
            Update Collection
        </Button>
        <Link to={`/collection/${collection.id}`}>
            <Button className="cancel-btn" color="success" style={{fontFamily: "Fredoka"}}>
                Cancel
            </Button>
        </Link>
      </section>
    </main>
  );
}