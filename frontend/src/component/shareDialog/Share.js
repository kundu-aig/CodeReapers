import React from "react";
import { Button } from "react-bootstrap";
import { RWebShare } from "react-web-share";

const Example = ({ title, url, tagline }) => {
  return (
    <div>
      <RWebShare
        data={{
          text: tagline,
          url: url,
          title: title,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <img src="/share.svg" height={14} />
      </RWebShare>
    </div>
  );
};

export default Example;
