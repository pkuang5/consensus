import React from "react";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

function Loader(props) {
    return (
        <PacmanLoader
            css={override}
            size={30}
            color='white'
            loading={props.loading}
        />
    );
}

export default Loader