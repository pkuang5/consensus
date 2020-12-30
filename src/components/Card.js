import React, { useState, useEffect } from "react";
import { string, number, array } from "prop-types";
import { useSpring, animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";
import yelpREST from "../api/yelp";
import Map from './Map'
import 'font-awesome/css/font-awesome.min.css'
import { use100vh } from 'react-div-100vh'
import yelpSVG from '../svg/yelp.svg'

function Card({ i, x, y, rot, scale, trans, bind, data }) {
  const height = use100vh()
  const { coordinates, name, photos, categories, price, rating, transactions, location, display_phone, url, hours, phone, review_count } = data[i];
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  function timeParser(time) {
    time = parseInt(time)
    if (time >= 1300) {
      time -= 1200
      time = time.toString()
      if (time.length == 3) return time.substr(0, 1) + ':' + time.substr(1)
      return time.substr(0, 2) + ':' + time.substr(2)
    }
    else {
      time = time.toString()
      if (time.length == 3) return time.substr(0, 1) + ':' + time.substr(1)
      return time.substr(0, 2) + ':' + time.substr(2)
    }
  }

  function checkmark(yn) {
    if (yn) {
      return (<svg class="ml-1" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5001 0.168524C12.3793 0.0937538 12.2443 0.0424134 12.1026 0.0174359C11.961 -0.00754156 11.8156 -0.00566667 11.6748 0.0229535C11.5339 0.0515736 11.4004 0.106378 11.2817 0.184236C11.1631 0.262095 11.0617 0.361481 10.9834 0.476718L4.83808 9.5102L1.84111 6.86755C1.73537 6.77431 1.61141 6.70185 1.47631 6.6543C1.34121 6.60674 1.19761 6.58504 1.05371 6.59041C0.763089 6.60126 0.488895 6.72177 0.291444 6.92542C0.0939932 7.12907 -0.0105399 7.39919 0.000840775 7.67634C0.0122214 7.95349 0.138584 8.21498 0.352129 8.40329L4.28716 11.8729C4.28716 11.8729 4.40012 11.9656 4.4524 11.9981C4.57321 12.0729 4.70831 12.1243 4.84996 12.1493C4.99161 12.1743 5.13704 12.1724 5.27793 12.1438C5.41883 12.1152 5.55243 12.0604 5.6711 11.9825C5.78976 11.9046 5.89117 11.8052 5.96952 11.6899L12.8233 1.61501C12.9017 1.49981 12.9555 1.371 12.9817 1.23595C13.0079 1.1009 13.0059 0.962246 12.9759 0.82792C12.9459 0.693593 12.8885 0.566221 12.8068 0.45308C12.7252 0.339939 12.621 0.243246 12.5001 0.168524Z" fill="#83D028" />
      </svg>)
    } else {
      return (<svg class="ml-1" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.46331 1.5355L9.46421 1.5364C9.47585 1.54801 9.48508 1.5618 9.49139 1.57699C9.49769 1.59218 9.50093 1.60846 9.50093 1.6249C9.50093 1.64134 9.49769 1.65762 9.49138 1.67281C9.48508 1.68799 9.47585 1.70179 9.46421 1.71339L9.46376 1.71384L0.71376 10.4638C0.69017 10.4874 0.658174 10.5007 0.624813 10.5007C0.591452 10.5007 0.559456 10.4874 0.535866 10.4638C0.512276 10.4403 0.499023 10.4083 0.499023 10.3749C0.499023 10.3415 0.512276 10.3095 0.535866 10.2859L9.28587 1.53595L9.28631 1.5355C9.29792 1.52386 9.31172 1.51463 9.3269 1.50832C9.34209 1.50202 9.35837 1.49878 9.37481 1.49878C9.39125 1.49878 9.40753 1.50202 9.42272 1.50832C9.43791 1.51463 9.4517 1.52386 9.46331 1.5355Z" fill="#FF1212" stroke="#F0515B" />
        <path d="M0.535747 1.5364L0.535748 1.5364L0.536641 1.5355C0.548252 1.52386 0.562046 1.51463 0.577232 1.50832C0.592418 1.50202 0.608698 1.49878 0.625141 1.49878C0.641584 1.49878 0.657864 1.50202 0.673049 1.50832C0.688235 1.51463 0.702029 1.52386 0.71364 1.5355L0.714087 1.53595L9.46409 10.2859C9.48768 10.3095 9.50093 10.3415 9.50093 10.3749C9.50093 10.4083 9.48768 10.4403 9.46409 10.4638C9.4405 10.4874 9.4085 10.5007 9.37514 10.5007C9.34178 10.5007 9.30978 10.4874 9.28619 10.4638L0.536194 1.71384L0.535747 1.7134C0.524106 1.70178 0.51487 1.68799 0.508569 1.67281C0.502267 1.65762 0.499023 1.64134 0.499023 1.6249C0.499023 1.60845 0.502267 1.59217 0.508569 1.57699C0.51487 1.5618 0.524106 1.54801 0.535747 1.5364Z" fill="#FF1212" stroke="#F0515B" />
      </svg>)
    }
  }

  function stars(n) {
    stars = []
    for (let i = 0; i < Math.floor(n); i++) {
      stars.push(<svg class="mr-1" width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0111 3.46255L7.79863 7.94615L2.84863 8.66568L6.42988 12.1579L5.58379 17.0868L10.0111 14.7594L14.4385 17.0844L13.5924 12.1555L17.1736 8.66568L12.2236 7.94615L10.0111 3.46255Z" fill="#FB686B" fill-opacity="0.35" />
        <path d="M19.2948 7.26876L13.344 6.40391L10.6839 1.01095C10.6112 0.86329 10.4917 0.743759 10.344 0.671102C9.97371 0.48829 9.52371 0.640634 9.33856 1.01095L6.6784 6.40391L0.72762 7.26876C0.563557 7.2922 0.413557 7.36954 0.298713 7.48673C0.159874 7.62943 0.0833666 7.82141 0.0860035 8.0205C0.0886403 8.21958 0.170205 8.40947 0.312776 8.54845L4.61824 12.7461L3.60106 18.6734C3.5772 18.8113 3.59246 18.9531 3.6451 19.0828C3.69774 19.2124 3.78565 19.3248 3.89887 19.407C4.01209 19.4892 4.14609 19.5381 4.28567 19.548C4.42524 19.558 4.56482 19.5286 4.68856 19.4633L10.0112 16.6649L15.3339 19.4633C15.4792 19.5406 15.6479 19.5664 15.8097 19.5383C16.2175 19.468 16.4917 19.0813 16.4214 18.6734L15.4042 12.7461L19.7097 8.54845C19.8268 8.4336 19.9042 8.2836 19.9276 8.11954C19.9909 7.70938 19.705 7.3297 19.2948 7.26876V7.26876ZM13.5925 12.1555L14.4386 17.0844L10.0112 14.7594L5.58387 17.0867L6.42996 12.1578L2.84871 8.66563L7.79871 7.9461L10.0112 3.46251L12.2237 7.9461L17.1737 8.66563L13.5925 12.1555V12.1555Z" fill="#FB686B" />
      </svg>)
    }
    if (String(n).includes('.5')) {
      stars.push(<svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2582 5.81015L19.209 6.675C19.6191 6.73594 19.905 7.11562 19.8418 7.52578C19.8183 7.68984 19.741 7.83984 19.6238 7.95469L15.3183 12.1523L16.3355 18.0797C16.4058 18.4875 16.1316 18.8742 15.7238 18.9445C15.5621 18.9727 15.3933 18.9469 15.248 18.8695L9.92536 16.0711L4.6027 18.8695C4.47896 18.9349 4.33939 18.9642 4.19981 18.9543C4.06023 18.9443 3.92624 18.8955 3.81302 18.8132C3.6998 18.731 3.61188 18.6187 3.55924 18.489C3.5066 18.3594 3.49135 18.2176 3.5152 18.0797L4.53239 12.1523L0.226919 7.95469C0.0843483 7.81571 0.00278331 7.62582 0.000146469 7.42674C-0.00249038 7.22765 0.0740166 7.03567 0.212856 6.89297C0.3277 6.77578 0.4777 6.69844 0.641763 6.675L6.59254 5.81015L9.2527 0.417186C9.43786 0.0468735 9.88786 -0.10547 10.2582 0.0773423C10.4058 0.149999 10.5254 0.26953 10.598 0.417186L13.2582 5.81015ZM14.3527 16.4906L13.5066 11.5617L17.0879 8.07187L12.1379 7.35234L9.92536 2.86875L9.92528 2.86889V14.1657L9.92536 14.1656L14.3527 16.4906ZM7.71286 7.35234L2.76286 8.07187L2.76297 8.07198L7.71278 7.35248L7.71286 7.35234Z" fill="#FB686B" />
      </svg>
      )
    } else {
      stars.push(
        <svg class="mr-1" width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.2948 7.26876L13.344 6.40391L10.6839 1.01095C10.6112 0.86329 10.4917 0.743759 10.344 0.671102C9.97371 0.48829 9.52371 0.640634 9.33856 1.01095L6.6784 6.40391L0.72762 7.26876C0.563557 7.2922 0.413557 7.36954 0.298713 7.48673C0.159874 7.62943 0.0833666 7.82141 0.0860035 8.0205C0.0886403 8.21958 0.170205 8.40947 0.312776 8.54845L4.61824 12.7461L3.60106 18.6734C3.5772 18.8113 3.59246 18.9531 3.6451 19.0828C3.69774 19.2124 3.78565 19.3248 3.89887 19.407C4.01209 19.4892 4.14609 19.5381 4.28567 19.548C4.42524 19.558 4.56482 19.5286 4.68856 19.4633L10.0112 16.6649L15.3339 19.4633C15.4792 19.5406 15.6479 19.5664 15.8097 19.5383C16.2175 19.468 16.4917 19.0813 16.4214 18.6734L15.4042 12.7461L19.7097 8.54845C19.8268 8.4336 19.9042 8.2836 19.9276 8.11954C19.9909 7.70938 19.705 7.3297 19.2948 7.26876ZM13.5925 12.1555L14.4386 17.0844L10.0112 14.7594L5.58387 17.0867L6.42996 12.1578L2.84871 8.66563L7.79871 7.9461L10.0112 3.46251L12.2237 7.9461L17.1737 8.66563L13.5925 12.1555Z" fill="#FB686B" />
        </svg>
      )
    }
    for (let i = 0; i < 4 - n; i++) {
      stars.push(
      <svg class="mr-1" width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.2948 7.26876L13.344 6.40391L10.6839 1.01095C10.6112 0.86329 10.4917 0.743759 10.344 0.671102C9.97371 0.48829 9.52371 0.640634 9.33856 1.01095L6.6784 6.40391L0.72762 7.26876C0.563557 7.2922 0.413557 7.36954 0.298713 7.48673C0.159874 7.62943 0.0833666 7.82141 0.0860035 8.0205C0.0886403 8.21958 0.170205 8.40947 0.312776 8.54845L4.61824 12.7461L3.60106 18.6734C3.5772 18.8113 3.59246 18.9531 3.6451 19.0828C3.69774 19.2124 3.78565 19.3248 3.89887 19.407C4.01209 19.4892 4.14609 19.5381 4.28567 19.548C4.42524 19.558 4.56482 19.5286 4.68856 19.4633L10.0112 16.6649L15.3339 19.4633C15.4792 19.5406 15.6479 19.5664 15.8097 19.5383C16.2175 19.468 16.4917 19.0813 16.4214 18.6734L15.4042 12.7461L19.7097 8.54845C19.8268 8.4336 19.9042 8.2836 19.9276 8.11954C19.9909 7.70938 19.705 7.3297 19.2948 7.26876ZM13.5925 12.1555L14.4386 17.0844L10.0112 14.7594L5.58387 17.0867L6.42996 12.1578L2.84871 8.66563L7.79871 7.9461L10.0112 3.46251L12.2237 7.9461L17.1737 8.66563L13.5925 12.1555Z" fill="#FB686B" />
      </svg>
      )
    }
    return stars
  }

  function displayHours(hours) {
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var html = []
    for (i = 0; i < 7; i++) {
      if (hours && hours[0].open[i]) html.push(<div class="flex justify-between"><p>{days[i]}</p><p>{timeParser(hours[0].open[i].start) + "-" + timeParser(hours[0].open[i].end)}</p></div>)
      else html.push(<div class="flex justify-between"><p>{days[i]}</p><p>n/a</p></div>)
    }
    return html
  }

  function goToGoogleMaps(lat, long) {
    var url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
    var win = window.open(url, '_blank');
    win.focus();
  }

  function goToYelp() {
    var win = window.open(url, '_blank');
    win.focus();
  }

  return (
    <animated.div
      key={i}
      style={{
        height: height,
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <animated.div
          className="frontface" id="front" style={{ opacity: opacity.interpolate(o => 1 - o), transform, zIndex: flipped ? -1 : 1 }}
        >
          <div className="card" >
            <div class="topCard">
              {photos.map((pic, index) => (
                <img src={pic} key={index} alt="profilePicture" />
              ))}
            </div>
            <div className="bottomCard" onClick={() => set(state => !state)} {...bind(i)}>
              <p class="text-center text-xl font-bold" >{name}</p>
              <div class="flex justify-between text-xs">
                <button className="infoTagSmall" >
                  🚙 X mi
                </button>
                <button className="infoTagSmall" >
                  💸 {price}
                </button>
                <div class="flex">
                  {stars(rating)}
                </div>
              </div>
              <div class="flex justify-between text-xs">
                <button className="infoTag" >
                  {categories[0] ? categories[0].title : ""}
                </button>
                <button className="infoTag" >
                  {categories[1] ? categories[1].title : ""}
                </button>
                <button className="infoTag" >
                  {'reviews: '+review_count}
                </button>
              </div>
              <div class="flex justify-between text-xs">
                <button className="infoTagWhite flex justify-center items-center" >
                  Pick up
                  {transactions ? checkmark(transactions.includes("pickup")) : null}
                </button>
                <button className="infoTagWhite flex justify-center items-center" >
                  Delivery
                  {transactions ? checkmark(transactions.includes("delivery")) : null}
                </button>
                <button className="infoTagWhite flex justify-center items-center" >
                  Reservation
                  {transactions ? checkmark(transactions.includes("restaurant_reservation")) : null}
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
            <Map center={{ lat: coordinates.latitude, lng: coordinates.longitude }} name={name} zoom={12} />
            <div className="backBottomCard" onClick={() => set(state => !state)} {...bind(i)}>
              <div class="flex justify-between text-center text-xl font-bold p-2 border-b" >{name}
              <svg class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer" onClick={() => goToYelp()} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g fill="#f44336"><path d="m12.062 17.662c.038-.934-1.266-1.395-1.829-.671-1.214 1.466-3.493 4.129-3.624 4.457-.347 1 1.28 1.638 2.312 2.024 1.121.42 1.919.591 2.392.51.342-.071.562-.248.67-.533.089-.245.08-5.568.079-5.787z"/><path d="m11.522.642c-.08-.31-.295-.51-.647-.6-1.037-.272-4.966.838-5.698 1.624-.234.238-.318.515-.248.828l4.985 8c1.018 1.628 2.298 1.139 2.214-.681h-.001c-.066-1.199-.544-8.775-.605-9.171z"/><path d="m9.413 15.237c.942-.29.872-1.671.07-1.995-2.139-.881-5.06-2.114-5.285-2.114-.876-.052-1.045 1.201-1.134 2.096-.08.81-.084 1.552-.014 2.229.066.714.221 1.443.933 1.485.309-.001 5.383-1.686 5.43-1.701z"/><path d="m20.514 12.052c.403-.281.342-.7.347-.838-.108-1.024-1.83-3.61-2.692-4.029-.328-.152-.614-.143-.858.029-.323.219-3.24 4.444-3.413 4.619-.567.767.244 1.871 1.092 1.648l-.014.029c.341-.115 5.274-1.282 5.538-1.458z"/><path d="m15.321 15.586c-.881-.315-1.712.81-1.2 1.581.145.247 2.809 4.705 3.043 4.871.225.191.507.219.83.095.905-.362 2.865-2.876 2.992-3.857.051-.348-.042-.619-.286-.814-.197-.176-5.379-1.876-5.379-1.876z"/></g></svg>
              </div>
              <div class="flex text-xs justify-between items-center p-3 border-b">
                <p>X minutes away<br></br>
                {location.display_address.map(str => str + ' ')}
                </p>
                <svg class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer" onClick={() => goToGoogleMaps(coordinates.latitude, coordinates.longitude)} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect width="23" height="23" fill="url(#pattern0)" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0" transform="scale(0.0333333)" />
                    </pattern>
                    <image id="image0" width="30" height="30" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAB70lEQVRIie3Vz4tNURwA8M/4LWSEhVBqkMUoW40sWFgo2fhRdiNZsGchNsZGqVFK2SlsbeQfsLRQ02xoWJgGsxKDseBa3O9rzkz33HvfGzaTb51e9/s99/t597xz7mOJxBAe4R1mMYknOPSvwOUYxW8UmXEPK/42fCea/8Rt7McaDOA6vid4No4rlyj3zXPjBw5neh5M8KEc/L4HtMCNuqeJeoHHuQlpswmcQT+24ATGM/BA0uMWZjCS5HbHvMkmeAJbsQxHA12LBxl4ZdLja+S+JLnVkZttgk8H+jzJfc6gBXYmPUYCv5nkdsW8t01wfzxp5/o8TsW4UAEP5xpGXIx5T5vgdcod3rneg03KJd1YAb9SrlBV9GEs5p1rgo8pz+JYkvuIzcpj08lNR77A2UzPk1GfUu6TWvhlwBtwCVeVv2MfniXooLllfKPcRGmswuuoX86hKVzgBQ4kte14GLVPgYo5ndfltQX9rkR+3PydXwunSzyJXxXoYFx35n7DjqhtM3e0jtShOTgdKVoFF7gftbtJrjHaooM1Tz2D9eaf+57hquWtW/LhBff3BE8r/+pgHz7U1KYyPbqG69Bu8K7gNmhbvDXcDdoGbwX3gjbhjbEYtA5vjL3xWfVi6GakR63TsxW+GDTFW6P/Y2nFHwS1YSFMqYd6AAAAAElFTkSuQmCC" />
                  </defs>
                </svg>
              </div>
              <div class="flex text-xs justify-between items-center p-3 border-b">
                <p>{display_phone}</p>
                <a href={`tel:${phone}`}>
                <svg class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.62 7.79C5.06 10.62 7.38 12.93 10.21 14.38L12.41 12.18C12.68 11.91 13.08 11.82 13.43 11.94C14.55 12.31 15.76 12.51 17 12.51C17.55 12.51 18 12.96 18 13.51V17C18 17.55 17.55 18 17 18C7.61 18 0 10.39 0 1C0 0.45 0.45 0 1 0H4.5C5.05 0 5.5 0.45 5.5 1C5.5 2.25 5.7 3.45 6.07 4.57C6.18 4.92 6.1 5.31 5.82 5.59L3.62 7.79Z" fill="black" />
                </svg>
                </a>
              </div>
              <div class="flex flex-col text-xs justify-between p-3">
                {displayHours(hours)}
              </div>
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
