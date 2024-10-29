import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { deleteMovie, getAllMovies } from "../../services/MoviesService.jsx";
import "../collections/collections.css";

export const DeleteMovie = () => {
    const [movie, setMovie] = useState([]);;
    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        getAllMovies().then((movies) => {
            const movieToDelete = movies.find((movie) => 
                movie.id === parseInt(id));
            if (movieToDelete) {
                setMovie(movieToDelete);
            }
        });
    }, [id]);
    
    const handleDelete = () => {
        deleteMovie(id).then(() => {
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
                    <h1>Delete Movie</h1>
                    <p>Are you sure you want to delete the Movie: <strong>{movie.title}</strong>?</p>
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