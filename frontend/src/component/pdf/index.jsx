// components/IframePdfViewer.js
import React from "react";

const IframePdfViewer = ({ pdfUrl }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={pdfUrl}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
};

export default IframePdfViewer;
