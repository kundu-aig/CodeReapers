import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  Alert,
  Spinner,
  Container,
} from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import withAuth from "../hoc/withAuth";
import Profile from "../component/profile";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photo: "",
    tagLine: "",
    bannerImage: "",
    logo: "",
    urlHandle: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userType = userData?.userType ?? "";

  useEffect(() => {
    // Fetch existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem("userData")) || {};
    setFormData(existingData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.urlHandle) {
      setError("First Name, Last Name, and URL Handle are required.");
      setLoading(false);
      return;
    }

    try {
      // Call API to update profile
      const response = await axios.post("/api/updateProfile", formData);
      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
        localStorage.setItem("profileData", JSON.stringify(formData));
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
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
        <Card className="my-4">
          <Card.Header>
            <Card.Title>Update Profile</Card.Title>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                />
                {formData.photo && (
                  <img
                    style={{ height: "150px", width: "150px", margin: "10px" }}
                    src={formData.photo}
                  ></img>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tagline</Form.Label>
                <Form.Control
                  type="text"
                  name="tagLine"
                  value={formData.tagLine}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label>Banner Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="bannerImage"
                  value={formData.bannerImage}
                  onChange={handleChange}
                />
              </Form.Group> */}
              <Form.Group className="mb-3">
                <Form.Label>Logo URL</Form.Label>
                <Form.Control
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>URL Handle</Form.Label>
                <Form.Control
                  type="text"
                  name="urlHandle"
                  value={formData.urlHandle}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default withAuth(UpdateProfile, ["agent", "market"]);
