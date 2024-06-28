import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import axios from "../../axios";

const UploadForm = () => {
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  // const [lob, setLob] = useState("");
  const [agent, setAgent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);
  const uploadRef = useRef();

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
    if (!file || !category || !agent) {
      setError("Please fill in all fields and select a valid file.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("media", file);
    formData.append("category", category);
    formData.append("agentId", agent);
    try {
      const response = await axios.post("/api/collateral", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("File uploaded successfully!");
      setFile("");
      setCategory("");
      setAgent("");
      uploadRef.current.value = "";
    } catch (err) {
      let errorMsg = err?.response?.data?.error?.message;
      if (errorMsg) {
        setError(errorMsg);
      } else {
        setError("Failed to upload the file. Please try again.");
      }
      setFile("");
      setCategory("");
      setAgent("");
      uploadRef.current.value = "";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let userData = JSON.parse(localStorage?.getItem("userData"));
        let lob = userData.lob;
        let response = await axios.get(`/api/collateral/agentlist/${lob}`);
        // console.log("resp", response);
        let data = response?.data?.data;
        // console.log(data);
        if (data) {
          setAgents(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Card className="p-2">
      <Card.Body>
        <Card.Title>Upload Collertal</Card.Title>
        <Form onSubmit={handleSubmit}>
          {error && (
            <Alert dismissible variant="danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert dismissible variant="success">
              {success}
            </Alert>
          )}

          <Form.Group controlId="fileUpload" className="mb-3">
            <Form.Label>File Select</Form.Label>
            <Form.Control
              type="file"
              ref={uploadRef}
              onChange={handleFileChange}
            />
          </Form.Group>

          <Form.Group controlId="categorySelect" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="brochure">Brochure</option>
              <option value="flyer">Flyer</option>
              <option value="teaser">Teaser</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="agentSelect" className="mb-3">
            <Form.Label>Agent</Form.Label>
            <Form.Select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <option value="">Select Agent</option>
              {agents &&
                agents?.map((agent, index) => (
                  <option key={index} value={agent?._id}>
                    {agent?.firstName + (agent?.lastName || "")}
                  </option>
                ))}
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
