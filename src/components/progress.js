import React from "react";

function Progress(props) {
  return (
    <h2>
      {props.current}/{props.total}
    </h2>
  );
}

export default Progress;
