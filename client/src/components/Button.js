import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Mbtn, { setBackground, fontSize, palette } from "m-btn";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
//import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

function Button(props) {
  return (
    <div>
      <AwesomeButton onPress={props.onClick} type="primary">{props.buttonName}</AwesomeButton>
    </div>
  );
}

export default Button;

// const bg = setBackground("primary", "lighter");
// const Wrapper = styled.div`
//   background-color: ${bg.color};
//   font-size: ${fontSize.bodyBig};
//   text-align: center;
//   flex-direction: column;
//   align-items: center;
// `;

// export default class Button extends Component {
//   getChildContext() {
//     return { bg: bg };
//   }

//   render() {
//     return (
//       <Wrapper>
//         <Mbtn
//           primary
//           bold
//           lighter
//           color="grey"
//           content="Hello"
//         />
//       </Wrapper>
//     );
//   }
// }

// Button.childContextTypes = {
//   bg: PropTypes.object,
// };
