import React from "react";

export default function Loader() {
  return (
    <div className=" loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 start-0 bottom-0">
      <span className="loader"></span>
    </div>
  );
}
