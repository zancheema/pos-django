import { Col, Container, Row } from "react-bootstrap";
import CategoryDistribution from "../components/dashboard/CategoryDistribution";
import Sales from "../components/dashboard/Sales";
import SalesProgress from "../components/dashboard/SalesProgress";

function Dashboard() {
    return (
        <Container fluid className="pt-4">
            <Row>
                <Col className="mb-2" lg={8}><SalesProgress /></Col>
                <Col className="mb-2" lg={4}>
                    <Row className="mb-2"><Sales /></Row>
                    <Row><CategoryDistribution /></Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;