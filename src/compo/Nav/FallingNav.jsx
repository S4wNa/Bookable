import React from "react";

function FallingNav() {
  return (
    <div
      className="bg-red-100 absolute inset-0"
      style={{
        clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)",
      }}
    ></div>
  );
}

export default FallingNav;
