import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { deleteCollection, getAllCollections } from "../../services/CollectionsService.jsx";
import "./collections.css";

export const DeleteCollection = () => {
    const [collection, setCollection] = useState([]);;
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("User")).id;

    
    useEffect(() => {
        getAllCollections().then((collections) => {
            const collectionToDelete = collections.find((collection) => 
                collection.id === parseInt(id));
            if (collectionToDelete) {
                setCollection(collectionToDelete);
            }
        });
    }, [id]);
    
    const handleDelete = () => {
        deleteCollection(id).then(() => {
            navigate("/Collections");
        });
    };
    
    if (userId !== "1") {
        return null; // Render nothing if the userTypeId is not 1
    }
    
    if (!collection) return <p>Loading...</p>;

    return (
        <div className="container-collections">
            <Card
                body
                color="light"
                className="collection-card"
                style={{
                    fontFamily: "Fredoka",
                    color: 'grey'
                }}
            >
            <CardBody className="collection-card-body">
                <div className="collection-info">
                    <h1>Delete Collection</h1>
                    <p>Are you sure you want to delete the Collection: <strong>{collection.name}</strong>?</p>
                </div>
                <div className="collection-buttons">
                    <Button color="danger" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                    <Button color="secondary" onClick={() => navigate("/Collections")}>
                        Cancel
                    </Button>
                </div>
            </CardBody>
            </Card>
        </div>
    );
};