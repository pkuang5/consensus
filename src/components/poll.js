import React, { useState, useEffect } from "react";
import database from "../firebase";
import Restaurant from "./restaurant";
import Swipe from "react-easy-swipe";

function Poll(props) {
  const [index, setIndex] = useState(0);

  function upVote() {
    console.log("up vote");
    database
      .ref(`groups/${props.groupCode}/${props.businesses[index]}`)
      .transaction(function (vote) {
        return (vote || 0) + 1;
      });
    setIndex(index + 1);
  }

  function downVote() {
    console.log("down vote");
    database
      .ref(`groups/${props.groupCode}/${props.businesses[index]}`)
      .transaction(function (vote) {
        return (vote || 0) - 1;
      });
    setIndex(index + 1);
  }

  return (
    <Swipe onSwipeRight={() => upVote()} onSwipeLeft={() => downVote()}>
      <Restaurant class="w-full" id={props.businesses[index]} />
    </Swipe>
  );
}

export default Poll;
