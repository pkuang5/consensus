import React, { useState, useEffect } from "react";
import { string, number, array } from "prop-types";
import { useSpring, animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";
import yelpREST from "../api/yelp";
import Map from './Map'
import 'font-awesome/css/font-awesome.min.css'

function Card({ i, x, y, rot, scale, trans, bind, data }) {
  const { coordinates, name, photos } = data[i];
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  // async function focusBack(id) {
  //   //getElementById('back').style.zIndex = 1;
  //   id.style.zIndex = -1;
  // }

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
        className="frontface" id="front" 
        >
        <animated.div
          style={{ opacity: opacity.interpolate(o => 1 - o), transform, zIndex: flipped ? -1 : 1 }}
        >
          <div className="card" >
            <Carousel>
              {photos.map((pic, index) => (
                <img src={pic} key={index} alt="profilePicture" />
              ))}
            </Carousel>
            <p class="text-center text-xl">{name}</p>
            <button class="p-8 bg-blue-600" onClick={() => set(state => !state)}><i class="fa fa-info"></i></button>
          </div>
        </animated.div>
      </animated.div>
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
        className="backface" id="back"
        >
        <animated.div
          style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`), zIndex: flipped ? 1 : -1 }}
        >
          <div className="card" >
            <Map center={{ lat: coordinates.latitude, lng: coordinates.longitude }} name={name} zoom={15} />
            <button class="p-8 bg-blue-600" onClick={() => set(state => !state)}><i class="fa fa-info"></i></button>
          </div>
        </animated.div>
      </animated.div>
    </animated.div>
  );
};

Card.propTypes = {
  name: string,
  age: number,
  distance: string,
  text: string,
  photos: array
};

export default Card;
