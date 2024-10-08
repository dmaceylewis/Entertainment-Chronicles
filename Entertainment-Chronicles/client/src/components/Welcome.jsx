import {
    Card, 
    CardTitle, 
    Col, 
    Row
} from "reactstrap"
// import "./welcome.css"
import { Link } from "react-router-dom"

export const Welcome = ({ currentUser }) => {
    return (
        <>
            <div className="echron-header">

                <article className="echrom-title">
                    <h1>Welcome to the Entertainment Chronicles</h1>
                    <h2>Organize different versions of entertainment into collections!</h2>
                </article>
            <hr></hr>
            </div>

            <div className="echron-collections">
            <Row xs="3">
                <Col sm="6"
                style={{
                    border: '1em',
                    color: 'yellow'
                  }}>
                    <Card>
                        <i className="fa-solid fa-book-open"></i>
                        <CardTitle tag="h5">
                            Book Collections
                        </CardTitle>
                    </Card>
                </Col>
                <Col sm="6"
                style={{
                    border: '1em',
                    color: 'cyan'
                  }}>
                    <Card>
                        <i className="fa-solid fa-tv"></i>
                        <CardTitle tag="h5">
                            TV Collections
                        </CardTitle>
                    </Card>
                </Col>
                <Col sm="6"
                style={{
                    border: '1em',
                    color: 'magenta'
                  }}>
                    <Card>
                        <i className="fa-solid fa-film"></i>
                        <CardTitle tag="h5">
                            Movie Collections
                        </CardTitle>
                    </Card>
                </Col>
            </Row>
            </div>
        </>
    )
}