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
import { addShow, getAllSeasons } from "../../services/ShowsService";
import "../auth/login.css";

export const AddMovies = ({ collection }) => {
    const [series, setSeries] = useState([]);
    const [chosenSeriesType, setChosenSeriesType] = useState({});
    const [season, setSeason] = useState([]);
    const [addedMovie, setAddedMovie] = useState([]);
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

    useEffect(() => {
        getAllSeasons().then((allSeasons) => setSeason(allSeasons));
    }, []);


    const [newMovie, setNewMovie] = useState({
        title: "",
        order: 0,
        watched: false
    });

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
    AddMovies(movie).then(setNewMovie({
        title: "",
        order: 0,
        watched: false
    }).catch((error) => {
        console.error("Error adding show:", error);
      }))
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
                                onChange={(event) => {
                                    const seriesCopy = { ...newMovie };
                                    seriesCopy.seriesId = event.target.value;
                                    setNewMovie(seriesCopy);
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
                <Label for="showTitle" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Title of Movie</Label>
                <Input 
                  className="login-form-input"
                  id="showTitle" type="text"
                  placeholder="Enter new show title here"
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
        <Link to={`/collections/${collection.id}`}>
            <Button color="primary" style={{fontFamily: "Fredoka"}}>
                Save Movies to Series
            </Button>
        </Link>
      </section>
    </main>
  );
}