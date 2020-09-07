import React from "react";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loader(props) {
    return (
        <GridLoader
            css={override}
            size={30}
            color={"#123abc"}
            loading={props.loading}
        />
    );
}

export default Loader