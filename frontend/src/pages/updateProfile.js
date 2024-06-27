import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    photo: "",
    tagline: "",
    bannerImage: "",
    logo: "",
    urlHandle: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    if (!formData.firstname || !formData.lastname || !formData.urlHandle) {
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
    <Card>
      <Card.Header>
        Update Profile
        <Button
          variant="secondary"
          className="float-end"
          onClick={() => router.push("/")}
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
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname}
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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tagline</Form.Label>
            <Form.Control
              type="text"
              name="tagline"
              value={formData.tagline}
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
  );
};

export default UpdateProfile;
