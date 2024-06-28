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
// import ShareDialog from "../shareDialog/ShareDialog";
// import ShareButton from "../shareDialog/ShareButton";
import Share from "../../component/shareDialog/Share";

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
  const [showShare, setShowShare] = useState(false);
  const [urlToShare, setUrlToShare] = useState("");
  const itemsPerPage = 10;

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
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
        console.log("agent response" + response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, [currentPage, categoryFilter, lobFilter]);

  // const handleCopyUrl = (title,url) => {
  //   // navigator.clipboard
  //   //   .writeText(title)
  //   //   .then(() => {
  //   //     alert("URL copied to clipboard!");
  //   //   })
  //   //   .catch((err) => {
  //   //     console.error("Failed to copy the URL: ", err);
  //   //   });
  //     const userData = JSON.parse(localStorage.getItem("userData")) || {};
  //     var urlHandle = userData.urlHandle
  //     if(urlHandle){
  //       console.log("share dialog called")
  //       var urlToShare = `${process.env.NEXT_PUBLIC_API_BASE_URL}$/${urlHandle}/media-${title}`
  //       console.log(`urlToShare - ${urlToShare}`)
  //       setUrlToShare(urlToShare)
  //       setShowShare(true)
  //     }
  // };
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      {/* {showShare && <ShareButton title={"Share"} text={"Share your Url"} url={urlToShare}/>} */}
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
              <th>Document Type</th>
              <th>LOB</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item?.title}</td>
                <td>{titleCase(item?.category)}</td>
                <td>
                  {item?.media?.mediaType?.includes("video")
                    ? "Video"
                    : item?.media?.mediaType?.includes("image")
                    ? "Image"
                    : "PDF"}
                </td>
                <td>{titleCase(item?.lob)}</td>
                <td>
                  {/* <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCopyUrl(item.documentTitle,item.url)}
                  >
                    Share
                  </Button> */}
                  <Share
                    title={`${userData.firstName} ${userData.lastName}`}
                    tagline={userData?.tagLine ?? "TailorMade"}
                    url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${userData?.urlHandle}/${item?.title}`}
                  />
                </td>
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
