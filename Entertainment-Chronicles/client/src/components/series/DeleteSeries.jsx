import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { deleteSeries, getAllSeries } from "../../services/SeriesService";
import "../collections/collections.css";

export const DeleteSeries = () => {
    const [series, setSeries] = useState([]);;
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("User")).id;

    
    useEffect(() => {
        getAllSeries().then((series) => {
            const seriesToDelete = series.find((series) => 
                series.id === parseInt(id));
            if (seriesToDelete) {
                setSeries(seriesToDelete);
            }
        });
    }, [id]);
     
    const handleDelete = () => {
        deleteSeries(id).then(() => {
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
                    <h1>Delete Series</h1>
                    <p>Are you sure you want to delete the Series: <strong>{series.name}</strong>?</p>
                </div>
                <div>
                    <Button color="danger" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                    <Button color="secondary" onClick={() => navigate(`/collection/${series.id}`)}>
                        Cancel
                    </Button>
                </div>
            </CardBody>
            </Card>
        </div>
    );
};