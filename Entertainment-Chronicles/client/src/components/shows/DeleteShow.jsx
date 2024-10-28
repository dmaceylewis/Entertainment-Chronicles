import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { deleteShow, getAllShows } from "../../services/ShowsService.jsx";
import "../collections/collections.css";

export const DeleteShow = () => {
    const [show, setShow] = useState([]);;
    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        getAllShows().then((shows) => {
            const showToDelete = shows.find((show) => 
                show.id === parseInt(id));
            if (showToDelete) {
                setShow(showToDelete);
            }
        });
    }, [id]);
    
    const handleDelete = () => {
        deleteShow(id).then(() => {
            navigate("/Collections");
        });
    };

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
            <CardBody>
                <div className="collection-delete">
                    <h1>Delete Show</h1>
                    <p>Are you sure you want to delete the Show: <strong>{show.title}</strong>?</p>
                </div>
                <div>
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