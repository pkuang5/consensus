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
        // {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <animated.div
          className="frontface" id="front" style={{ opacity: opacity.interpolate(o => 1 - o), transform, zIndex: flipped ? -1 : 1 }}
        >
          <div className="card" >
            <Carousel>
              {photos.map((pic, index) => (
                <img src={pic} key={index} alt="profilePicture" />
              ))}
            </Carousel>
            <div className="bottomCard p-3" onClick={() => set(state => !state)} {...bind(i)}>
              <p class="text-center text-xl mb-3">{name}</p>
              <div class="flex justify-between mb-3 text-xs">
                <button className="infoTag" >
                  🚙 5 mi
                </button>
                <button className="infoTag" >
                  💸 $$
                </button>
                <div>
                  <span class="fa fa-star fa-lg star"></span>
                  <span class="fa fa-star fa-lg star"></span>
                  <span class="fa fa-star fa-lg star"></span>
                  <span class="fa fa-star fa-lg star"></span>
                  <span class="fa fa-star fa-lg star"></span>
                </div>
              </div>
              <div class="flex justify-between text-xs mb-3">
                <button className="infoTag" >
                🍟 Fast Food
                </button>
                <button className="infoTag" >
                🍔 Burgers
                </button>
                <button className="infoTag" >
                🇺🇸 American
                </button>
              </div>
              <div class="flex justify-between text-xs">
                <button className="infoTagWhite flex justify-center items-center" >
                  Takeout
                  <svg class="ml-1" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5001 0.168524C12.3793 0.0937538 12.2443 0.0424134 12.1026 0.0174359C11.961 -0.00754156 11.8156 -0.00566667 11.6748 0.0229535C11.5339 0.0515736 11.4004 0.106378 11.2817 0.184236C11.1631 0.262095 11.0617 0.361481 10.9834 0.476718L4.83808 9.5102L1.84111 6.86755C1.73537 6.77431 1.61141 6.70185 1.47631 6.6543C1.34121 6.60674 1.19761 6.58504 1.05371 6.59041C0.763089 6.60126 0.488895 6.72177 0.291444 6.92542C0.0939932 7.12907 -0.0105399 7.39919 0.000840775 7.67634C0.0122214 7.95349 0.138584 8.21498 0.352129 8.40329L4.28716 11.8729C4.28716 11.8729 4.40012 11.9656 4.4524 11.9981C4.57321 12.0729 4.70831 12.1243 4.84996 12.1493C4.99161 12.1743 5.13704 12.1724 5.27793 12.1438C5.41883 12.1152 5.55243 12.0604 5.6711 11.9825C5.78976 11.9046 5.89117 11.8052 5.96952 11.6899L12.8233 1.61501C12.9017 1.49981 12.9555 1.371 12.9817 1.23595C13.0079 1.1009 13.0059 0.962246 12.9759 0.82792C12.9459 0.693593 12.8885 0.566221 12.8068 0.45308C12.7252 0.339939 12.621 0.243246 12.5001 0.168524Z" fill="#83D028" />
                  </svg>
                </button>
                <button className="infoTagWhite flex justify-center items-center" >
                  Delivery
                  <svg class="ml-1" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.46331 1.5355L9.46421 1.5364C9.47585 1.54801 9.48508 1.5618 9.49139 1.57699C9.49769 1.59218 9.50093 1.60846 9.50093 1.6249C9.50093 1.64134 9.49769 1.65762 9.49138 1.67281C9.48508 1.68799 9.47585 1.70179 9.46421 1.71339L9.46376 1.71384L0.71376 10.4638C0.69017 10.4874 0.658174 10.5007 0.624813 10.5007C0.591452 10.5007 0.559456 10.4874 0.535866 10.4638C0.512276 10.4403 0.499023 10.4083 0.499023 10.3749C0.499023 10.3415 0.512276 10.3095 0.535866 10.2859L9.28587 1.53595L9.28631 1.5355C9.29792 1.52386 9.31172 1.51463 9.3269 1.50832C9.34209 1.50202 9.35837 1.49878 9.37481 1.49878C9.39125 1.49878 9.40753 1.50202 9.42272 1.50832C9.43791 1.51463 9.4517 1.52386 9.46331 1.5355Z" fill="#FF1212" stroke="#F0515B" />
                    <path d="M0.535747 1.5364L0.535748 1.5364L0.536641 1.5355C0.548252 1.52386 0.562046 1.51463 0.577232 1.50832C0.592418 1.50202 0.608698 1.49878 0.625141 1.49878C0.641584 1.49878 0.657864 1.50202 0.673049 1.50832C0.688235 1.51463 0.702029 1.52386 0.71364 1.5355L0.714087 1.53595L9.46409 10.2859C9.48768 10.3095 9.50093 10.3415 9.50093 10.3749C9.50093 10.4083 9.48768 10.4403 9.46409 10.4638C9.4405 10.4874 9.4085 10.5007 9.37514 10.5007C9.34178 10.5007 9.30978 10.4874 9.28619 10.4638L0.536194 1.71384L0.535747 1.7134C0.524106 1.70178 0.51487 1.68799 0.508569 1.67281C0.502267 1.65762 0.499023 1.64134 0.499023 1.6249C0.499023 1.60845 0.502267 1.59217 0.508569 1.57699C0.51487 1.5618 0.524106 1.54801 0.535747 1.5364Z" fill="#FF1212" stroke="#F0515B" />
                  </svg>

                </button>
                <button className="infoTagWhite flex justify-center items-center" >
                  Dine in
                  <svg class="ml-1" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.46331 1.5355L9.46421 1.5364C9.47585 1.54801 9.48508 1.5618 9.49139 1.57699C9.49769 1.59218 9.50093 1.60846 9.50093 1.6249C9.50093 1.64134 9.49769 1.65762 9.49138 1.67281C9.48508 1.68799 9.47585 1.70179 9.46421 1.71339L9.46376 1.71384L0.71376 10.4638C0.69017 10.4874 0.658174 10.5007 0.624813 10.5007C0.591452 10.5007 0.559456 10.4874 0.535866 10.4638C0.512276 10.4403 0.499023 10.4083 0.499023 10.3749C0.499023 10.3415 0.512276 10.3095 0.535866 10.2859L9.28587 1.53595L9.28631 1.5355C9.29792 1.52386 9.31172 1.51463 9.3269 1.50832C9.34209 1.50202 9.35837 1.49878 9.37481 1.49878C9.39125 1.49878 9.40753 1.50202 9.42272 1.50832C9.43791 1.51463 9.4517 1.52386 9.46331 1.5355Z" fill="#FF1212" stroke="#F0515B" />
                    <path d="M0.535747 1.5364L0.535748 1.5364L0.536641 1.5355C0.548252 1.52386 0.562046 1.51463 0.577232 1.50832C0.592418 1.50202 0.608698 1.49878 0.625141 1.49878C0.641584 1.49878 0.657864 1.50202 0.673049 1.50832C0.688235 1.51463 0.702029 1.52386 0.71364 1.5355L0.714087 1.53595L9.46409 10.2859C9.48768 10.3095 9.50093 10.3415 9.50093 10.3749C9.50093 10.4083 9.48768 10.4403 9.46409 10.4638C9.4405 10.4874 9.4085 10.5007 9.37514 10.5007C9.34178 10.5007 9.30978 10.4874 9.28619 10.4638L0.536194 1.71384L0.535747 1.7134C0.524106 1.70178 0.51487 1.68799 0.508569 1.67281C0.502267 1.65762 0.499023 1.64134 0.499023 1.6249C0.499023 1.60845 0.502267 1.59217 0.508569 1.57699C0.51487 1.5618 0.524106 1.54801 0.535747 1.5364Z" fill="#FF1212" stroke="#F0515B" />
                  </svg>

                </button>
              </div>
            </div>
          </div>
        </animated.div>
      </animated.div>
      <animated.div
        style={{
          position: "absolute",
          zIndex: flipped ? 1 : -1,
          transform: interpolate([rot, scale], trans)
        }}
      >
        <animated.div
          className="backface" id="back" style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`), zIndex: flipped ? 1 : -1 }}
        >
          <div className="card" >
            <Map center={{ lat: coordinates.latitude, lng: coordinates.longitude }} name={name} zoom={15} />
            <div className="bottomCard" onClick={() => set(state => !state)} {...bind(i)}>
            </div>
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
