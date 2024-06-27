// pages/market-dashboard.js
import React, { useState } from "react";
import withAuth from "../../hoc/withAuth";
import { Container, Row, Col, Nav, Tab, Card, Button } from "react-bootstrap";
import Listing from "../../component/marketListing";
import Upload from "../../component/upload";
import Profile from "../../component/profile";
import { useRouter } from "next/router";

const MarketDashboard = () => {
  const [activeKey, setActiveKey] = useState("listing");
  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
  const dashboard = () => {
    let user = localStorage?.getItem("userData")
      ? JSON.parse(localStorage?.getItem("userData"))
      : "";
    if (user?.userType) {
      router.push(`/dashboard/${user?.userType}`);
    }
  };
  return (
    <Container>
      <Row className="justify-content-between align-items-center py-3">
        <Col>
          {!router?.asPath?.includes("/dashboard") && (
            <Button className="mx-4" variant="primary" onClick={dashboard}>
              Dashboard
            </Button>
          )}
          {router?.asPath?.includes("/dashboard") && (
            <Button
              className="mx-4"
              variant="primary"
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </Button>
          )}
          <Button variant="primary" onClick={logout}>
            Logout
          </Button>
        </Col>
        <Col className="text-end">
          <Profile />
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link
                eventKey="listing"
                active={activeKey === "listing"}
                onClick={() => setActiveKey("listing")}
              >
                Listing
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="upload"
                active={activeKey === "upload"}
                onClick={() => setActiveKey("upload")}
              >
                Upload
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10}>
          <Tab.Content>
            <Tab.Pane eventKey="listing" active={activeKey === "listing"}>
              <Listing />
            </Tab.Pane>
            <Tab.Pane eventKey="upload" active={activeKey === "upload"}>
              <Upload />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuth(MarketDashboard, ["market"]);
