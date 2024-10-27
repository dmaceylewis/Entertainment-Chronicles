import React, { useEffect, useState } from "react";
import { 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Button
} from 'reactstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSeriesById } from "../../services/SeriesService";
import "../auth/login.css";
import { editMovie, getAllMovies } from "../../services/MoviesService";

export const EditMovie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [hasWatched, setHasWatched] = useState(false);
    const [series, setSeries] = useState({})
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
      setHasWatched(!hasWatched);
    };

    useEffect(() => {
        getAllMovies().then((movies) => {
          const movieToEdit = movies.find(
            (movie) => movie.id === parseInt(id)
          );
            setMovie(movieToEdit);
            getSeriesById(movieToEdit.seriesId).then((series) => setSeries(series))
        });
    }, [id]);


    const editMovieObj = () => {
        
        let movieCopy = {...movie}
    
        editMovie(movieCopy).then(() => {
                  navigate(`/collection/${series?.collectionId}`);
                });
    }
  

  return (
    <main className="container-collections">
      <section className="form-collection">
          <article className="echron-title">
            <h3>Edit Movie: {movie.title}</h3>
          </article>
          <hr />
          <Form>
            <fieldset>
              <FormGroup className="form-group">
                <Label for="movieTitle" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Title of Movie</Label>
                <Input 
                  className="login-form-input"
                  id="movieTitle" type="text"
                  placeholder={movie.title}
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const movieCopy = { ...newMovie };
                    movieCopy.title = event.target.value;
                    setMovie(movieCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="movieOrder" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Movie Order in Series</Label>
                <Input 
                  className="login-form-input"
                  id="movieOrder" type="number"
                  placeholder={movie.order}
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const movieCopy = { ...newMovie };
                    movieCopy.order = event.target.value;
                    setMovie(movieCopy);
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
          </fieldset>
        </Form>

        <Button color="primary" style={{fontFamily: "Fredoka"}} onClick={() => editMovieObj()}>
            Update Movie
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