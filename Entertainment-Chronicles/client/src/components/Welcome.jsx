import {
    Card, 
    CardBody, 
    CardTitle, 
    Col, 
    Row
} from "reactstrap"
import "./welcome.css"
import { Link } from "react-router-dom"

export const Welcome = () => {
    return (
        <>
            <div className="echron-header">
                <article className="echron-title">
                    <h1>Welcome to the Entertainment Chronicles</h1>
                    <h2>Organize different versions of entertainment into collections!</h2>
                </article>
            <hr></hr>
            </div>

            <div className="echron-collections">
            <Row xs="3">
                <Col>
                    <Card
                        body
                        color="warning"
                        className="text-center"
                        style={{
                            width: '12rem',
                            fontFamily: "Fredoka",
                            color: 'white'
                        }}
                    >
                        <br></br>
                        <i className="fa-solid fa-book-open fa-xl" />
                        <br></br>
                        <CardBody>
                            <CardTitle tag="h4">
                                Book Collections
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card
                        body
                        color="info"
                        className="text-center"
                        style={{
                            width: '12rem',
                            fontFamily: "Fredoka",
                            color: 'white'
                        }}
                    >
                        <br></br>
                        <i className="fa-solid fa-tv fa-xl" />
                        <br></br>
                        <CardBody>
                            <CardTitle tag="h4">
                                TV Collections
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card
                        body
                        color="danger"
                        className="text-center"
                        style={{
                            width: '12rem',
                            fontFamily: "Fredoka",
                            color: 'white'
                        }}
                    >
                        <br></br>
                        <i className="fa-solid fa-film fa-2xl" />
                        <br></br>
                        <CardBody>
                            <CardTitle tag="h4">
                                Movie Collections
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </div>
        </>
    )
}