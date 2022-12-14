import React from "react";

const Spinner = () => (
  <div className="my-4 text-center">
    <div className="spinner-border" style={{ height: "6em", width: "6em" }}>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Spinner;
