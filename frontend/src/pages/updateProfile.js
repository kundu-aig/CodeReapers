import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Spinner, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import withAuth from "../hoc/withAuth";

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

  useEffect(() => {
    // Fetch existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem("userData")) || {};
    setFormData(existingData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #3a7bd5, #00d2ff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="mobilemarginprofile">
        <Card>
          <Card.Header>
            Update Profile
            <Button
              variant="secondary"
              className="float-end"
              onClick={() => router.push("/dashboard/" + userData?.userType)}
            >
              Go to Dashboard
            </Button>
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
                <img
                  style={{ height: "150px", width: "150px", margin: "10px" }}
                  src={formData.photo}
                ></img>
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
              <Form.Group className="mb-3">
                <Form.Label>Banner Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="bannerImage"
                  value={formData.bannerImage}
                  onChange={handleChange}
                />
              </Form.Group>
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
      </Container>
    </div>
  );
};

export default withAuth(UpdateProfile, ["agent", "market"]);
