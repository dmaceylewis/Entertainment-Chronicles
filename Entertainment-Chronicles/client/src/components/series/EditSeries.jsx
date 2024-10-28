import React, { useEffect, useState } from "react";
import { 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Button 
} from 'reactstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { editSeries, getAllSeries, getSeriesById } from "../../services/SeriesService";
import { getCollectionById } from "../../services/CollectionsService";
import "../auth/login.css";

export const EditSeries = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const [name, setName] = useState("");
    const [order, setOrder] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeries = async () => {
            const allSeries = await getAllSeries();
            const seriesToEdit = allSeries.find((s) => s.id === parseInt(id));

            if (seriesToEdit) {
                setSeries(seriesToEdit);
                setName(seriesToEdit.name);
                setOrder(seriesToEdit.order);
            }
        };

        fetchSeries();
    }, [id]);

    const editSeriesObj = async () => {
        if (!series) return;

        const collectionId = series.collectionId;

        // Fetch existing series for the collection
        const existingSeries = await getSeriesById(collectionId);

        // Check for order conflicts
        const newOrder = parseInt(order);

        if (existingSeries && existingSeries.some(s => s.order === newOrder && s.id !== series.id)) {
            // Increment order for all existing series with the same order
            await Promise.all(existingSeries
                .filter(s => s.order >= newOrder)
                .map(s => {
                    s.order += 1; // Increment order
                    return editSeries(s); // Update each series in the database
                })
            );
        }

        const seriesCopy = {
            id: series.id,
            name,
            order: newOrder,
            collectionId: parseInt(series.collectionId)
        };

        editSeries(seriesCopy).then(() => {
            navigate(`/collection/${series.collectionId}`);
        }).catch((error) => {
            console.error("Error editing series:", error);
        });
    };

    if (!series) return <div>Loading...</div>; // Optional loading state

    return (
        <main className="container-collections">
            <section className="form-collection">
                <article className="echron-title">
                    <h3>Edit Series: {series.name}</h3>
                </article>
                <hr />
                <Form>
                    <fieldset>
                        <FormGroup className="form-group">
                            <Label for="seriesName" style={{ fontFamily: "Fredoka", textAlign: 'left' }}>Series Name</Label>
                            <Input 
                                className="login-form-input"
                                id="seriesName" type="text"
                                value={name}
                                style={{ borderRadius: 5, fontFamily: "Fredoka" }}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label for="seriesOrder" style={{ fontFamily: "Fredoka" }}>Series Order</Label>
                            <Input 
                                className="login-form-input"
                                id="seriesOrder" type="number"
                                value={order} // Ensure value is tied to the state
                                style={{ borderRadius: 5, fontFamily: "Fredoka" }}
                                onChange={(event) => setOrder(event.target.value)} 
                            />
                        </FormGroup>
                    </fieldset>
                </Form>

                <Button color="primary" style={{ fontFamily: "Fredoka" }} onClick={editSeriesObj}>
                    Update Series
                </Button>
                <Link to={`/collection/${series.collectionId}`}>
                    <Button className="cancel-btn" color="success" style={{ fontFamily: "Fredoka" }}>
                        Cancel
                    </Button>
                </Link>
            </section>
        </main>
    );
};
