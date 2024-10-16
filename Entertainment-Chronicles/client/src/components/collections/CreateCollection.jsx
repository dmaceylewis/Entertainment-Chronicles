import React, { useState } from "react";
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { addCollection } from "../../services/CollectionsService";
import "../auth/login.css";

export const CreateCollection = () => {
  const [name, setName] = useState("");
  const userId = JSON.parse(localStorage.getItem("User")).id;
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCollection = {
      name,
      userId
    };
    addCollection(newCollection).then((c) => {
      navigate("/collections/series/add");
    }).catch((error) => {
        console.error("Error creating collection:", error);
      });
  };
  

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
                    href="/collection/add"
                    tag="a"
                >
                    New Collection
                </BreadcrumbItem>
        </Breadcrumb>
      <section>
        <Form className="form-collection" onSubmit={handleSubmit}>
          <article className="echron-title">
            <h1>Create a Collection</h1>
          </article>
          <hr />
          <fieldset>
              <FormGroup className="form-group">
                <Label for="collection" style={{fontFamily: "Fredoka"}}>Collection Name</Label>
                <Input 
                  className="login-form-input"
                  id="collection" type="text"
                  placeholder="Enter new collection name here"
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