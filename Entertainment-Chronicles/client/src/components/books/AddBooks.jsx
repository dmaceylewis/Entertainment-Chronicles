import React, { useEffect, useState } from "react";
import { 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Col,
  Button,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllSeries } from "../../services/SeriesService";
import { addBook } from "../../services/BooksService";
import "../auth/login.css";

export const AddBooks = ({ collection }) => {
    const [series, setSeries] = useState([]);
    const [chosenSeriesType, setChosenSeriesType] = useState({});
    const [addedBook, setAddedBook] = useState([]);
    const platformId = useParams();

    useEffect(() => {
        getAllSeries().then((allSeries) => setSeries(allSeries));
    }, []);

    {/* Select Series Type Dropdown Function */}
    const handleSeriesTypeChoice = (changeEvent) => {
        if (changeEvent.target.id === "series") {
           setChosenSeriesType(parseInt(changeEvent.target.value))
        }
    }
    document.addEventListener("change", handleSeriesTypeChoice)


    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        order: 0,
        read: false
    });

    const [hasRead, setHasRead] = useState(false);

    const handleCheckboxChange = () => {
      setHasRead(!hasRead);
    };
  
  const handleAddBook = (e) => {
    e.preventDefault();
    const book = {
      title: newBook.title,
      author: newBook.author,
      order: parseInt(newBook.order),
      read: newBook.read,
      seriesId: parseInt(newBook.seriesId),
      platformId: parseInt(newBook.platformId)
    };
    setAddedBook((currentArray) => [...currentArray, book])
    addBook(book).then(setNewBook({
        title: "",
        author: "",
        order: 0,
        read: false
    }).catch((error) => {
        console.error("Error adding book:", error);
      }))
  };
  

  return (
    <main className="container-collections">
      <section>
        <Form className="form-collection">
          <article className="echron-title">
            <h3>Add a Book</h3>
          </article>
          <hr />
          <fieldset>
                <FormGroup row>
                    <Col>
                            <Input
                                id="series"
                                name="select"
                                type="select"
                                onChange={(event) => {
                                    const seriesCopy = { ...newBook };
                                    seriesCopy.seriesId = event.target.value;
                                    setNewBook(seriesCopy);
                                }}
                            >
                                    <option value= '0'>
                                        Select Series...
                                    </option>

                                {series.map((series) => {
                                     return (
                                        <option key={series.id} value= {series.id}>
                                            {series.name}
                                        </option>
                                    )
                                })}
                            </Input>
                    </Col>
                </FormGroup>
              <FormGroup className="form-group">
                <Label for="bookTitle" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Title of Book</Label>
                <Input 
                  className="login-form-input"
                  id="bookTitle" type="text"
                  placeholder="Enter new book title here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const bookCopy = { ...newBook };
                    bookCopy.title = event.target.value;
                    setNewBook(bookCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="author" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Author of Book</Label>
                <Input 
                  className="login-form-input"
                  id="author" type="text"
                  placeholder="Enter new book author here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const bookCopy = { ...newBook };
                    bookCopy.author = event.target.value;
                    setNewBook(bookCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="bookOrder" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Book Order in Series</Label>
                <Input 
                  className="login-form-input"
                  id="bookOrder" type="number"
                  placeholder="Enter book order here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const bookCopy = { ...newBook };
                    bookCopy.order = event.target.value;
                    setNewBook(bookCopy);
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
              <br />
              
              {/* Add Book Button */}
              <Button 
                className="save-btn" 
                color="warning" outline 
                style={{
                    fontFamily: "Fredoka",
                    display: 'flex',
                    justifyContent: 'flex-start'
                }} 
                onClick={handleAddBook}
              >
                    Add Book
              </Button>
          </fieldset>
        </Form>
        <br/>
        <hr/>

        {/* List of Items Added */}
        <Card
            style={{
                width: '18rem'
            }}
        >
        <CardHeader>
            Added Books
        </CardHeader>
        {addedBook.map((book) => {
            return (
                <ListGroup flush key={book.id}>
                    <ListGroupItem>
                        Book: {book.title}
                    </ListGroupItem>
                </ListGroup>
            )
        })}                   
        </Card>

        {/* Submit New Books Button */}
        <br/>
        <h5 className="mb-2" style={{fontFamily: "Fredoka", color: 'grey'}}>
            Click when you're finished adding books to this series
        </h5>
        <Link to={`/collections/${collection.id}`}>
            <Button color="primary" style={{fontFamily: "Fredoka"}}>
                Save Books to Series
            </Button>
        </Link>
      </section>
    </main>
  );
}