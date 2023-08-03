import React from "react";

const TrigerActionButton = (props) => {
  return (
    <div {...props} style={{ cursor: "pointer " }}>
      {props.children}
    </div>
  );
};

export default TrigerActionButton;
