import React, { useEffect, useState } from "react";
import {  
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
import { getAllSeries, getSeriesById } from "../../services/SeriesService";
import { addMovie, getMoviesById } from "../../services/MoviesService";
import "../auth/login.css";

export const AddMovies = () => {
    const [series, setSeries] = useState([]);
    const [chosenSeriesType, setChosenSeriesType] = useState({});
    const [addedMovie, setAddedMovie] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: "",
        order: 0,
        watched: false,
        seriesId: 0,
        platformId: 2
    });

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

    const [chosenSeries, setChosenSeries] = useState({})

    const handleSeriesChange = (event) => {
      const selectedSeriesId = parseInt(event.target.value);
      setNewMovie((prev) => ({ ...prev, seriesId: selectedSeriesId }));
  
      if (selectedSeriesId) {
          getMoviesById(selectedSeriesId).then((seriesData) => {
              setChosenSeries(seriesData); // Ensure this contains correct data
          });
      } else {
          setChosenSeries({});
      }
  };
  

    
    {/* Watched Book Checkbox Function */}
    const [hasWatched, setHasWatched] = useState(false);

    const handleCheckboxChange = () => {
      setHasWatched(!hasWatched);
    };
  

  const handleAddMovie = (e) => {
    e.preventDefault();
    const movie = {
      title: newMovie.title,
      order: parseInt(newMovie.order),
      watched: newMovie.watched,
      seriesId: parseInt(newMovie.seriesId),
      platformId: parseInt(newMovie.platformId)
    };
    setAddedMovie((currentArray) => [...currentArray, movie])
    addMovie(movie).then(() => {
        // Reset the newMovie state upon successful addition
        setNewMovie({
          title: "",
          order: 0,
          watched: false,
          seriesId: 0,
          platformId: 0
        });
    }).catch((error) => {
        console.error("Error adding movie:", error);
      })
  };
  

  return (
    <main className="container-collections">
      <section className="form-collection">
          <article className="echron-title">
            <h3>Add a Movie</h3>
          </article>
          <hr />
          <fieldset>
                <FormGroup row>
                    <Col>
                            <Input
                                id="series"
                                name="select"
                                type="select"
                                style={{
                                    borderRadius: 5,
                                    fontFamily: "Fredoka"
                                  }}
                                  onChange={handleSeriesChange}
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
                <Label for="movieTitle" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Title of Movie</Label>
                <Input 
                  className="login-form-input"
                  id="movieTitle" type="text"
                  placeholder="Enter new movie title here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const movieCopy = { ...newMovie };
                    movieCopy.title = event.target.value;
                    setNewMovie(movieCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="movieOrder" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Movie Order in Series</Label>
                <Input 
                  className="login-form-input"
                  id="movieOrder" type="number"
                  placeholder="Enter movie order here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const movieCopy = { ...newMovie };
                    movieCopy.order = event.target.value;
                    setNewMovie(movieCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup check style={{fontFamily: "Fredoka", color: 'white', textAlign: 'left'}}>
                <Input 
                    type="checkbox" 
                    checked={hasWatched} 
                    onChange={handleCheckboxChange}  
                />
                {' '}
                <Label check>
                    Watched the movie?
                </Label>
              </FormGroup>
              <br />
              
              {/* Add Movie Button */}
              <Button 
                className="save-btn" 
                color="warning" outline 
                style={{
                    fontFamily: "Fredoka",
                    display: 'flex',
                    justifyContent: 'flex-start'
                }} 
                onClick={handleAddMovie}
              >
                    Add Movie
              </Button>
          </fieldset>
        <br/>
        <hr/>

        {/* List of Items Added */}
        <Card
            style={{
                width: '18rem'
            }}
        >
        <CardHeader>
            Added Movies
        </CardHeader>
        {addedMovie.map((movie) => {
            return (
                <ListGroup flush key={movie.id}>
                    <ListGroupItem>
                        Movie: {movie.title}
                    </ListGroupItem>
                </ListGroup>
            )
        })}                   
        </Card>

        {/* Submit New Movies Button */}
        <br/>
        <h5 className="mb-2" style={{fontFamily: "Fredoka", color: 'white'}}>
            Click when you're finished adding movies to this series
        </h5>
        <Link to={`/collection/${chosenSeries?.collectionId}`}>
            <Button color="primary" style={{fontFamily: "Fredoka"}}>
                Save Movies to Series
            </Button>
        </Link>
      </section>
    </main>
  );
}