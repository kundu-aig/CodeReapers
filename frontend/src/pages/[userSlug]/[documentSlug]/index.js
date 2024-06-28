// pages/[userSlug]/[documentSlug].js
import { Container, Row, Col, Image, Card } from "react-bootstrap";
// import dynamic from "next/dynamic";
import axios from "axios";
import Head from "next/head";
import Profile from "../../../component/publicProfile";
// Dynamically import the PDFViewer only when needed
import PDFViewer from "../../../component/pdf";

const UserProfile = ({ pageData }) => {
  //   console.log("pageData", pageData);
  const renderContent = (document) => {
    const { mediaType, url } = document;

    if (mediaType.startsWith("image/")) {
      return <Image src={url} fluid className="document-content" />;
    } else if (mediaType === "application/pdf") {
      return (
        <div className="pdf-viewer">
          <PDFViewer fileUrl={url} />
        </div>
      );
    } else if (mediaType.startsWith("video/")) {
      return (
        <video width="100%" height="auto" controls className="document-content">
          <source src={url} type={mediaType} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <p>Unsupported content type</p>;
    }
  };

  return (
    <>
      <Head>
        <title>
          {pageData?.agentId?.firstName + pageData?.agentId?.lastName}
        </title>
        <meta
          property="og:title"
          content={pageData?.agentId?.firstName + pageData?.agentId?.lastName}
        />
        <meta name="description" content={pageData?.agentId?.tagLine} />
        <meta name="robots" content="index, follow" />
        <meta property="og:description" content={pageData?.agentId?.tagLine} />
        <meta property="og:image" content={pageData?.agentId?.logo?.url} />
      </Head>
      <Container className="profile-container my-4">
        {/* <Row className="header-row">
          <Col xs={12} md={3} className="d-flex align-items-center">
            <Image
              src={
                "https://static.vecteezy.com/system/resources/previews/020/806/106/large_2x/chocolate-logo-sample-vector.jpg" ??
                pageData?.agentId?.logo?.url
              }
              roundedCircle
              className="profile-image"
            />
            <span className="username">
              {pageData?.agentId?.firstName + pageData?.agentId?.lastName}
            </span>
          </Col>
          <Col xs={12} md={9}>
            <Image
              src={pageData?.agentId.banner?.url}
              fluid
              className="banner-image"
            />
          </Col>
        </Row> */}
        <Profile user={pageData?.agentId} />
        <Row className="mt-3">
          <Col>
            <Card className="content-card">
              <Card.Body>{renderContent(pageData?.media)}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const { documentSlug } = context?.params;
  try {
    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/collateral/details/${documentSlug}`,
      null,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjdlNDk5YjczMzU4MzA1MjIyOTFhYjIiLCJ1c2VyVHlwZSI6ImFnZW50IiwibG9iIjoiaGVhbHRoIiwiaWF0IjoxNzE5NTUyNDExLCJleHAiOjE3MTk1NTk2MTF9.U1h9gHwkGjic3aZp8Mtj8Px9RglgENPn4dJj5VBw0o8",
        },
      }
    );
    if (!res || !res.data.success) {
      return {
        notFound: true,
      };
    }
    let pageData = res.data.data;
    // console.log("res", res.data.data);

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
