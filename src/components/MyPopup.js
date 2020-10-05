import React from "react";
import { Popup } from "semantic-ui-react";

const MyPopup = ({ content, children, ...rest }) => {
  return <Popup content={content} trigger={children} {...rest} />;
};

export default MyPopup;
