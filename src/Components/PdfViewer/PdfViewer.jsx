import React from "react";

const PdfViewer = ({ pdfUrl, height = "600px" }) => {
  if (!pdfUrl) return null;

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(
          pdfUrl
        )}&embedded=true`}
        width="100%"
        height={height}
        title="PDF Viewer"
        className="border-0"
      />
    </div>
  );
};

export default PdfViewer;
