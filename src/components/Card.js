import React, { useState, useEffect } from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";
import yelpREST from "../api/yelp";

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
  // const { name, age, distance, text, pics } = data[i];
  
  const [name, setName] = useState("")
  const [pics, setPics] = useState([])

  yelpREST(`/businesses/${data[i]}`).then(({ data }) => {
    setName(data.name);
    // setImageArray([]);
    // setImageIndex(0);
    data.photos.forEach((image) => {
      setPics((imageArray) => [...imageArray, image]);
    });
  })

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div className="card">
          <Carousel>
            {pics.map((pic, index) => (
              <img src={pic} key={index} alt="profilePicture" />
            ))}
          </Carousel>
          <h2>{name},</h2>
          {/* <h2>{age}</h2>
          <h5>{distance}</h5>
          <h5>{text}</h5> */}
        </div>
      </animated.div>
    </animated.div>
  );
};

Card.propTypes = {
  name: string,
  age: number,
  distance: string,
  text: string,
  pics: array
};

export default Card;
