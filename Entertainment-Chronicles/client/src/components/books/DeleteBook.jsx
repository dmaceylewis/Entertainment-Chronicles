import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { deleteBook, getAllBooks } from "../../services/BooksService.jsx";
import "../collections/collections.css";

export const DeleteBook = () => {
    const [book, setBook] = useState([]);;
    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        getAllBooks().then((books) => {
            const bookToDelete = books.find((book) => 
                book.id === parseInt(id));
            if (bookToDelete) {
                setBook(bookToDelete);
            }
        });
    }, [id]);
    
    const handleDelete = () => {
        deleteBook(id).then(() => {
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
                    <h1>Delete Book</h1>
                    <p>Are you sure you want to delete the Book: <strong>{book.title}</strong>?</p>
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