// pages/404.js
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Container fluid className="text-center my-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="mb-4">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
          <Link href="/" passHref>
            <Button variant="primary">Go to Homepage</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Custom404;
