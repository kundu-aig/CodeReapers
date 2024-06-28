import React, { useState } from "react";
import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [lob, setLob] = useState("");
  const [agent, setAgent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const allowedFileTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
  ];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!allowedFileTypes.includes(selectedFile.type)) {
        setError(
          "Invalid file type. Please upload a PDF, image (jpg, png, webp), or video (mp4)."
        );
        setFile(null);
        return;
      }
      if (selectedFile.size > maxFileSize) {
        setError("File size exceeds the 10MB limit.");
        setFile(null);
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !category || !lob || !agent) {
      setError("Please fill in all fields and select a valid file.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("lob", lob);
    formData.append("agent", agent);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("File uploaded successfully!");
      setFile(null);
      setCategory("");
      setLob("");
      setAgent("");
    } catch (err) {
      setError("Failed to upload the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-2">
      <Card.Body>
        <Card.Title>Upload Collertal</Card.Title>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form.Group controlId="fileUpload" className="mb-3">
            <Form.Label>File Select</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Form.Group controlId="categorySelect" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Brochure">Brochure</option>
              <option value="Flyer">Flyer</option>
              <option value="Teaser">Teaser</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="lobSelect" className="mb-3">
            <Form.Label>LOB</Form.Label>
            <Form.Select value={lob} onChange={(e) => setLob(e.target.value)}>
              <option value="">Select LOB</option>
              <option value="motor">Motor</option>
              <option value="health">Health</option>
              <option value="travel">Travel</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="agentSelect" className="mb-3">
            <Form.Label>Agent</Form.Label>
            <Form.Select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <option value="">Select Agent</option>
              <option value="Agent1">Agent1</option>
              <option value="Agent2">Agent2</option>
              <option value="Agent3">Agent3</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UploadForm;
