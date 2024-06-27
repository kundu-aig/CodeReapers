import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const Listing = () => {
  return (
    <Card>
      <Card.Header>Listing</Card.Header>
      <Card.Body>
        <div className="mb-3">filter by LOB, Category, Agent</div>
        <ListGroup>
          <ListGroup.Item>Item 1</ListGroup.Item>
          <ListGroup.Item>Item 2</ListGroup.Item>
          <ListGroup.Item>Item 3</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Listing;
