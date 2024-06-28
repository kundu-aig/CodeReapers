import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Pagination,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import axios from "../../axios";

const dummyData = [
  {
    documentTitle: "Doc1",
    category: "Brochure",
    agentName: "Agent1",
    url: "http://example.com/1",
    documentType: "pdf",
    lob: "motor",
  },
  {
    documentTitle: "Doc2",
    category: "Flyer",
    agentName: "Agent2",
    url: "http://example.com/2",
    documentType: "image",
    lob: "health",
  },
  {
    documentTitle: "Doc3",
    category: "Teaser",
    agentName: "Agent3",
    url: "http://example.com/3",
    documentType: "video",
    lob: "travel",
  },
  // Add more dummy data as needed
];

const DocumentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lobFilter, setLobFilter] = useState("");
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2;

  function titleCase(str = "") {
    var splitStr = str?.toLowerCase().split(" ");
    for (var i = 0; i < splitStr?.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i]?.charAt(0)?.toUpperCase() + splitStr[i]?.substring(1);
    }
    // Directly return the joined string
    return splitStr?.join(" ");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/collateral", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        setData(response.data.data.results);
        setTotalPages(response.data.totalPages);
        // setData(dummyData);
        // setTotalPages(2);
        const token = localStorage.getItem("authToken");
      } catch (error) {}
    };
    fetchData();
  }, [currentPage, categoryFilter, lobFilter]);

  const handleCopyUrl = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the URL: ", err);
      });
  };

  return (
    <>
      <Card className="p-2">
        <Form>
          <Row className="my-3">
            <Col>
              <Form.Group controlId="categoryFilter">
                <Form.Label>Filter by Category</Form.Label>
                <Form.Select
                  size="sm"
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  <option value="Brochure">Brochure</option>
                  <option value="Flyer">Flyer</option>
                  <option value="Teaser">Teaser</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lobFilter">
                <Form.Label>Filter by LOB</Form.Label>
                <Form.Select
                  size="sm"
                  value={lobFilter}
                  onChange={(e) => {
                    setLobFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All LOB</option>
                  <option value="motor">Motor</option>
                  <option value="health">Health</option>
                  <option value="travel">Travel</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Table striped bordered hover size="small" responsive>
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Category</th>
              <th>Agent Name</th>
              <th>URL</th>
              <th>Document Type</th>
              <th>LOB</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item?.title}</td>
                <td>{titleCase(item?.category)}</td>
                <td>
                  {titleCase(
                    item?.agentId?.firstName + " " + item?.agentId?.lastName
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCopyUrl(item?.media?.url)}
                  >
                    Copy
                  </Button>
                </td>
                <td>
                  {item?.media?.mediaType?.includes("video")
                    ? "Video"
                    : item?.media?.mediaType?.includes("image")
                    ? "Image"
                    : "PDF"}
                </td>
                <td>{item.lob}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => setCurrentPage(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Card>
    </>
  );
};

export default DocumentTable;
