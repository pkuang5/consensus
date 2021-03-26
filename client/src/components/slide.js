import React, {Component, useState} from "react";
import Question from "./question";
import IntroQuest from "./introQuest";
import Button from "./Button";
import Progress from "react-progressbar";
import Select from 'react-select';
import LocationQuestion from './locationQuestion';

//CURRENT SLIDER PACKAGE
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  WithStore, 
  CarouselContext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";


//NUKA SLIDER
//import Carousel from 'nuka-carousel';


//GEOLOCATION PACKAGE
import Geolocation from "./Geolocation";
import { isConstructorDeclaration } from "typescript";
import { render } from "@testing-library/react";


const options = [{value:1, label:'1'}];
const answers = [];

function SlideComponent(){
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     test: 0
  //   };
  //   this.firstButton = this.firstButton.bind(this);
  //   this.handleEvent = this.handleEvent.bind(this);
  // }

  //const carouselContext = useContext(CarouselContext);
  //const [currentSlide, setCurrentSlide] = useState(0);
  const [indexSlide, setIndexSlide] = useState(0);

  const firstButton = () => {
    setIndexSlide(1);
  };

  const handleEvent = () => {
    setIndexSlide(indexSlide+1);
  };
  
  
  return (
    <div>
      <CarouselProvider
        naturalSlideWidth={120}
        naturalSlideHeight={200}
        totalSlides={10}
        orientation="vertical"
        currentSlide={indexSlide}
      >
        <Slider>
          <Slide index={0}>
            <IntroQuest />
            <Button onClick={firstButton} buttonName="Let's Go!"></Button>
          </Slide>
          <Slide index={1}>
            <Question slide={0} />
            <Button onClick={handleEvent} buttonName="Next">Next!</Button>
            {/* <Select width="20%" options={options} /> */}
          </Slide>
          <Slide index={2}>
            <Question slide={2}/>
          </Slide>

          { /* can delete boolean logic*/}
          {false ? (
             <Slide index={3}>
             <LocationQuestion decision={true}/>
            </Slide>
          ) : ( 
          <Slide index={3}>
            <LocationQuestion decision={false}/>
          </Slide>)}
          
          <Slide index={4}>
            <Question slide={3}/>
          </Slide>
          <Slide index={5}>
            <Question slide={4}/>
          </Slide>
          <Slide index={6}>
            <Question slide={5}/>
          </Slide>
          <Slide index={7}>
            <Question slide={6}/>
          </Slide>
          <Slide index={8}>
            <Question slide={7}/>
          </Slide>
          <Slide index={9}>
            <Question slide={8}/>
          </Slide>
        </Slider>
        {/* <Question slide={9} /> */}
      </CarouselProvider>
      <Progress completed={100} />
    </div>
  );
  
  
}

export default SlideComponent;