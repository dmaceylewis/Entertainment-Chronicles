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

export const AddShows = ({ collection }) => {
    const [series, setSeries] = useState([]);
    const [chosenSeriesType, setChosenSeriesType] = useState({});
    const [season, setSeason] = useState([]);
    const [addedShow, setAddedShow] = useState([]);
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


    const [newShow, setNewShow] = useState({
        title: "",
        order: 0,
        watched: false
    });

    const [hasWatched, setHasWatched] = useState(false);

    const handleCheckboxChange = () => {
      setHasWatched(!hasWatched);
    };
  
  const handleAddShow = (e) => {
    e.preventDefault();
    const show = {
      title: newShow.title,
      order: parseInt(newShow.order),
      watched: newShow.watched,
      seriesId: parseInt(newShow.seriesId),
      seasonId: parseInt(newShow.seasonId),
      platformId: parseInt(newShow.platformId)
    };
    setAddedShow((currentArray) => [...currentArray, show])
    addShow(show).then(setNewShow({
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
            <h3>Add a Show</h3>
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
                                    const seriesCopy = { ...newShow };
                                    seriesCopy.seriesId = event.target.value;
                                    setNewShow(seriesCopy);
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
                <Label for="showTitle" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Title of Show</Label>
                <Input 
                  className="login-form-input"
                  id="showTitle" type="text"
                  placeholder="Enter new show title here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const showCopy = { ...newShow };
                    showCopy.title = event.target.value;
                    setNewShow(showCopy);
                    }} 
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="season" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Season Number</Label>
                <Col>
                    <Input
                        id="season"
                        name="select"
                        type="select"
                        style={{
                            borderRadius: 5,
                            fontFamily: "Fredoka"
                          }}
                        onChange={(event) => {
                            const showCopy = { ...newShow };
                            showCopy.seasonId = event.target.value;
                            setNewShow(seasonCopy);
                        }}
                    >
                        <option value= '0'>
                            Select Season...
                        </option>

                        {season.map((season) => {
                            return (
                                <option key={season.id} value= {season.id}>
                                    <p>{season.number} - {season.episode}</p>
                                </option>
                            )
                        })}
                    </Input>
                </Col>
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="showOrder" style={{fontFamily: "Fredoka", textAlign: 'left'}}>Show Order in Series</Label>
                <Input 
                  className="login-form-input"
                  id="showOrder" type="number"
                  placeholder="Enter show order here"
                  style={{
                    borderRadius: 5,
                    fontFamily: "Fredoka"
                  }}
                  onChange={(event) => {
                    const showCopy = { ...newShow };
                    showCopy.order = event.target.value;
                    setNewShow(showCopy);
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
                    Watched the show?
                </Label>
              </FormGroup>
              <br />
              
              {/* Add Show Button */}
              <Button 
                className="save-btn" 
                color="warning" outline 
                style={{
                    fontFamily: "Fredoka",
                    display: 'flex',
                    justifyContent: 'flex-start'
                }} 
                onClick={handleAddShow}
              >
                    Add Show
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
            Added Shows
        </CardHeader>
        {addedShow.map((show) => {
            return (
                <ListGroup flush key={show.id}>
                    <ListGroupItem>
                        Show: {show.title}
                    </ListGroupItem>
                </ListGroup>
            )
        })}                   
        </Card>

        {/* Submit New Shows Button */}
        <br/>
        <h5 className="mb-2" style={{fontFamily: "Fredoka", color: 'white'}}>
            Click when you're finished adding shows to this series
        </h5>
        <Link to={`/collection/${collection.id}`}>
            <Button color="primary" style={{fontFamily: "Fredoka"}}>
                Save Shows to Series
            </Button>
        </Link>
      </section>
    </main>
  );
}