import React, { useEffect, useState } from "react";
import { 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Button
} from 'reactstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { editBook, getAllBooks } from "../../services/BooksService";
import { getSeriesById } from "../../services/SeriesService";
import "../auth/login.css";

export const EditBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [hasRead, setHasRead] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
      setHasRead(!hasRead);
    };

    useEffect(() => {
        getAllBooks().then((books) => {
          const bookToEdit = books.find(
            (book) => book.id === parseInt(id)
          );
            setBook(bookToEdit);
        });
    }, [id]);

    const [series, setSeries] = useState({})

    const handleSeries = () => {
        getSeriesById(book?.seriesId).then((series) => setSeries(series))
    }
    useEffect(() => {
        handleSeries()
    }, []);


    const editBookObj = () => {
        
        let bookCopy = {...book}
    
        editBook(bookCopy).then(() => {
                  navigate(`/collection/${series?.collectionId}`);
                });
    }
  

  return (
    <main className="container-collections">
      <section className="form-collection">
          <article className="echron-title">
            <h3>Edit Book: {book.title}</h3>
          </article>
          <hr />
          <Form>
            <fieldset>
              <FormGroup className="form-group">
                <Label for="bookTitle" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Title of Book</Label>
                <Input 
                  className="login-form-input"
                  id="bookTitle" type="text"
                  placeholder={book.title}
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const bookCopy = { ...book };
                    bookCopy.title = event.target.value;
                    setBook(bookCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="author" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Author of Book</Label>
                <Input 
                  className="login-form-input"
                  id="author" type="text"
                  placeholder={book.author}
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const bookCopy = { ...book };
                    bookCopy.author = event.target.value;
                    setBook(bookCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="bookOrder" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Book Order in Series</Label>
                <Input 
                  className="login-form-input"
                  id="bookOrder" type="number"
                  placeholder={book.order}
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const bookCopy = { ...book };
                    bookCopy.order = parseInt(event.target.value);
                    setBook(bookCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup check style={{fontFamily: "Fredoka", color: 'white', textAlign: 'left'}}>
                <Input 
                    type="checkbox" 
                    checked={hasRead} 
                    onChange={handleCheckboxChange}  
                />
                {' '}
                <Label check>
                    Read the book?
                </Label>
              </FormGroup>
          </fieldset>
        </Form>

        <Button color="primary" style={{fontFamily: "Fredoka"}} onClick={() => editBookObj()}>
            Update Book
        </Button>
        {/* <Link to={`/collection/${collection.id}`}>
            <Button className="cancel-btn" color="success" style={{fontFamily: "Fredoka"}}>
                Cancel
            </Button>
        </Link> */}
      </section>
    </main>
  );
}