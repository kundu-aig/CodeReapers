// components/SignupForm.js
import {
  Form,
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import axios from "../../axios";
import Link from "next/link";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
    lob: "",
    urlHandle: "",
    bannerImage: null,
    logo: null,
    tagLine: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Store only the first file
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]:
          type === "checkbox"
            ? checked
              ? [...prevState[name], value]
              : prevState[name].filter((item) => item !== value)
            : value,
      }));
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (!formData.userType) {
      errors.userType = "User Type is required";
    }
    if (formData.userType === "agent" && !formData.lob) {
      errors.lob = "Line of Business is required";
    }
    if (formData.userType === "agent" && !formData.urlHandle.trim()) {
      errors.urlHandle = "URL Handle (Slug) is required";
    }
    if (formData.userType === "agent" && !formData.logo) {
      errors.photo = "Logo is required";
    }
    // if (formData.userType === "agent" && !formData.bannerImage) {
    //   errors.photo = "BannerImage URL is required";
    // }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("userType", formData.userType);
        formDataToSend.append("lob", formData.lob);
        formDataToSend.append("urlHandle", formData.urlHandle);
        formDataToSend.append("tagLine", formData.tagLine);
        formDataToSend.append("bannerImage", formData.bannerImage);
        formDataToSend.append("logo", formData.logo);
        console.log("formData", formData);
        console.log("formDataToSend", formDataToSend.get("photo"));

        //! API CALL
        // let res = await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`,
        //   formDataToSend,
        //   {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   }
        // );
        // console.log("res", res);
        // if (!res.data || !res.data.statusCode === 200) {
        //   throw Error("Signup API Error");
        // }
        // let userData = res?.data?.data;
        // let { token, userType } = userData;

        // Reset form data and show success message
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          userType: "",
          lob: "",
          urlHandle: "",
          photoUrl: null,
          bannerUrl: null,
          tagLine: "",
        });
        setFormErrors({});
        setFormStatus("success");
        localStorage.setItem("authToken", "token");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            firstName: "nitin",
            lastName: "kr",
            photo: "",
            logo: "",
            userType: "market",
          })
        );
        router.push(`/dashboard/market`);
      } catch (error) {
        console.error("Error submitting form:", error);
        setFormStatus("error");
      } finally {
        setLoading(false);
      }
    } else {
      setFormStatus("error");
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form
            onSubmit={handleSubmit}
            style={{
              background: "rgb(255, 255, 254)",
              padding: "2rem",
              borderRadius: "8px",
            }}
          >
            {/* Basic Fields */}
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                className={formErrors.firstName ? "is-invalid" : ""}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                maxLength={100}
              />
              {formErrors.firstName && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.firstName}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                className={formErrors.lastName ? "is-invalid" : ""}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                maxLength={100}
              />
              {formErrors.lastName && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.lastName}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                type="email"
                className={formErrors.email ? "is-invalid" : ""}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={100}
              />
              {formErrors.email && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                className={formErrors.password ? "is-invalid" : ""}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={4}
                maxLength={32}
              />
              {formErrors.password && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* User Type Field */}
            <Form.Group className="mb-3">
              <Form.Label>User Type *</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  id="userTypeAgent"
                  value="agent"
                  name="userType"
                  label="Agent"
                  onChange={handleChange}
                  checked={formData.userType === "agent"}
                />
                <Form.Check
                  inline
                  type="radio"
                  id="userTypeMarket"
                  value="market"
                  name="userType"
                  label="Market"
                  onChange={handleChange}
                  checked={formData.userType === "market"}
                />
              </div>
              {formErrors.userType && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {formErrors.userType}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Line of Business (LOB) Field */}
            {/* {formData.userType === "agent" && ( */}
            <Form.Group className="mb-3">
              <Form.Label>Line of Business *</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  id="lobMotor"
                  value="motor"
                  name="lob"
                  label="Motor"
                  onChange={handleChange}
                  checked={formData.lob === "motor"}
                />
                <Form.Check
                  inline
                  type="radio"
                  id="lobHealth"
                  value="health"
                  name="lob"
                  label="Health"
                  onChange={handleChange}
                  checked={formData.lob === "health"}
                />
                <Form.Check
                  inline
                  type="radio"
                  id="lobTravel"
                  value="travel"
                  name="lob"
                  label="Travel"
                  onChange={handleChange}
                  checked={formData.lob === "travel"}
                />
              </div>
              {formErrors.lob && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {formErrors.lob}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Additional Fields for Agent */}
            {formData.userType === "agent" && (
              <>
                <Form.Group className="mb-3" controlId="urlHandle">
                  <Form.Label>URL Handle (Slug) *</Form.Label>
                  <Form.Control
                    type="text"
                    className={formErrors.urlHandle ? "is-invalid" : ""}
                    name="urlHandle"
                    value={formData.urlHandle}
                    onChange={handleChange}
                    minLength={4}
                    maxLength={40}
                  />
                  {formErrors.urlHandle && (
                    <Form.Control.Feedback type="invalid">
                      {formErrors.urlHandle}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="logo">
                  <Form.Label>Logo *</Form.Label>
                  <Form.Control
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tagLine">
                  <Form.Label>Tagline</Form.Label>
                  <Form.Control
                    type="text"
                    name="tagLine"
                    value={formData.tagLine}
                    onChange={handleChange}
                    maxLength={200}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bannerImage">
                  <Form.Label>Banner Image</Form.Label>
                  <Form.Control
                    type="file"
                    className={formErrors.bannerImage ? "is-invalid" : ""}
                    name="bannerImage"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {formErrors.bannerImage && (
                    <Form.Control.Feedback type="invalid">
                      {formErrors.bannerImage}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </>
            )}

            {/* Loader */}
            {loading && (
              <div className="text-center my-3">
                <Spinner animation="border" variant="primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {/* Form Submission Status */}
            {formStatus === "success" && (
              <Alert variant="success">Signup successful!</Alert>
            )}
            {formStatus === "error" && (
              <Alert variant="danger">
                Error submitting the form. Please try again later.
              </Alert>
            )}

            {/* Submit Button */}
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <div className={styles.links} style={{ marginTop: "10px" }}>
              <p>
                Already have an account? <Link href="/login">Login</Link>
              </p>
              <Link href="/">Back to home</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
