import React from "react";
import loading from "./loading.gif";

export default () => {
  return (
    <div>
      <img src={loading} alt="Loading..." style={{ margin: "auto", width: '150px', display: 'block' }} />
    </div>
  );
};
