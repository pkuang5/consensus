import React, {Component, useState} from "react";
import Question from "./question";
import IntroQuest from "./introQuest";
import Button from "./Button";
import Progress from "react-progressbar";
import Select from 'react-select';
import LocationQuestion from './locationQuestion';
import WhiteButton from './whiteButton';
import SpecificQuest from './specificQuest';
import Loader from "./loader";
import Input from "./Input";

import database from "../firebase";
import yelpREST from "../api/yelp";
import { use100vh } from 'react-div-100vh'
import { useHistory } from "react-router-dom";

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
import Carousel from 'nuka-carousel';


//GEOLOCATION PACKAGE
import Geolocation from "./Geolocation";
import { isConstructorDeclaration } from "typescript";
import { render } from "@testing-library/react";


//css
import "../styles/Question.css";

function SlideComponent(){
  const fullHeight = use100vh();
  let history = useHistory();
  
  const [answers, setAnswers] = useState({
        numPeople: 0,
        locationPermission: false,
        latitude: 0,
        longitude: 0, 
        milesWithin: 0,
        state: "", 
        city: "",
        spendAmount: 0,
        eatChoice: [],
        eatChoiceOrder: [],
        filters: {culture: [], occasion: [], genre: []},
        numRestaurantOptions: 0 ,
        groupCode: 0
    });

  const [loading, setLoading] = useState(false);  
  const [indexSlide, setIndexSlide] = useState(0);
  const [firstButtonColor, setFirstButtonColor] = useState('rgba(255, 255, 255, 0.5)');
  const [prog, setProg] = useState(0);

  const firstButton = () => {
    setIndexSlide(1);
    if(firstButtonColor === 'rgba(255, 255, 255, 0.5)'){
      setFirstButtonColor('rgba(255, 255, 255, 255)');
    }
    setTimeout(() => { setFirstButtonColor('rgba(255, 255, 255, 0.5)');}, 1000);
  };

  const handleLocation = () => {
    var latitude, longitude;
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      setAnswers({...answers, latitude: latitude});
      setAnswers({...answers, longitude: longitude});
      console.log(latitude);
    });
    console.log("asdasd");
};


  const callBack = (data, question) => {
    if(question === 0){
      setAnswers({...answers, numPeople: data});
      setProg(10);
    }
    else if(question === 1){
      setAnswers({...answers, locationPermission: data});
      if(data){
        handleLocation();
      }
      setProg(20);
    }
    else if(question === 2){
      setAnswers({...answers, milesWithin: data});
      setProg(30);
    }
    else if(question == 3){
      setAnswers({...answers, spendAmount: data});
      setProg(40);
    }
    else if(question == 4){
      setAnswers({...answers, eatChoiceOrder: data});
      let temp = [];
      for(var i = 0; i < data.length; i++){
        if(data[i] === 0){
          temp.push("restaurant");
        }
        if(data[i] === 1){
          temp.push("Fancy Dine-In");
        }
        if(data[i] === 2){
          temp.push("Fast Food");
        }
        if(data[i] === 3){
          temp.push("Drinks & Desserts");
        }
      }
      setAnswers({...answers, eatChoice: temp});

    }
    else if(question == 5){
      
    }
    else if(question == 6){
      setAnswers({...answers, numRestaurantOptions: data});
      setProg(70)
    }
    console.log(answers);
  };

  //handles creating group code, restaurant generation, and populating information
  async function populateFirebase(code){
    //setLoading(true);
    setAnswers({...answers, groupCode: code});
    console.log(answers.groupCode);
    let yelpParams = {
      radius: answers.milesWithin === 0 ? 5 : answers.milesWithin,
      limit: answers.numRestaurantOptions === 0 ? 15 : answers.numRestaurantOptions,
      price: answers.spendAmount === 0 ? 1 : answers.spendAmount,
      location: answers.locationPermission ? "" : answers.state + ", " + answers.city, 
      latitude: answers.locationPermission ? answers.latitude : "",
      longitude: answers.locationPermission ? answers.longitude : ""
    };
    await yelpREST("/businesses/search", {
      params: {
        location: "irvine",
        term: "boba",
        limit: 10,
      },
    }).then(({ data }) => {
      let { businesses } = data;

      businesses.reduce(async (memo, b) => {
        await memo
        await yelpREST(`/businesses/${b.id}`).then(({ data }) => {
          database.ref(`groups/${code}/data/${b.id}`).set(data);
          database.ref(`groups/${code}/data/${b.id}/vote`).set(0);
          database.ref(`groups/${code}/answers`).set(answers);
        })
      }, undefined).then(() => {
        setLoading(false);
        //create new final page with code
        //history.push(`/groupPage`)
      }
      )
    })
    
  };

  let test = false;
  if(test) return <input placeholder="test"></input>;
  
  if (loading) return <Loader loading={true} />;

  return (
    <div class="flex-col">
      {/* <Carousel vertical={true} initialSlideHeight={100}>
        <IntroQuest></IntroQuest>
        <Question slide={1}></Question>
        
      </Carousel> */}
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={119}
        totalSlides={9}
        orientation="vertical"
        currentSlide={indexSlide}
      >
        <Slider>
          <Slide index={0}>
            {/* <IntroQuest />
            <ButtonNext onClick={firstButton}>
              <div class="w-full flex flex-col items-center">
                <div style={{background: firstButtonColor, color: 'black', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem'}} 
                    class="h-12 w-24 border-4 border-white rounded-full flex items-center justify-center">
                  Let's Go
                </div>
              </div>
            </ButtonNext> */}
            <div>
              <div style={{backgroundImage: 'linear-gradient(#FDB872, #FCA870, #FC986F)'}} class="w-full flex h-full flex-col items-center">
                  <div style={{height: fullHeight}} class="ml-6 pt-1 flex-col w-screen justify-center">
                    <p class="text-white text-3xl text-center">Let's get started!<br></br>Here are a couple questions to help us provide your group with the best options! The next few questions will help us provide your group with the best options! Swipe up to move to the next question!</p>
                    <ButtonNext onClick={firstButton}>
                      <div class="w-full flex flex-col items-center">
                        <div style={{background: firstButtonColor, color: 'black', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem'}} 
                            class="h-12 w-24 border-4 border-white rounded-full flex items-center justify-center">
                          Let's Go
                        </div>
                      </div>
                    </ButtonNext>
                  </div>
              </div>
          </div>
          </Slide>
          
          <Slide index={1}>
            <SpecificQuest oldVal={answers.numPeople} parentCallBack={callBack} question={0} />
          </Slide>
          <Slide index={2}>
            <SpecificQuest oldVal={answers.locationPermission} parentCallBack={callBack} question={1}/>
          </Slide> 
          <Slide index={3}>
            <SpecificQuest oldVal={answers.milesWithin} parentCallBack={callBack} question={2} decision={answers.locationPermission}/>
          </Slide>
          <Slide index={4}>
            <SpecificQuest oldVal={answers.spendAmount} parentCallBack={callBack} question={3}/>
          </Slide>
          <Slide index={5}>
            <SpecificQuest oldVal={answers.eatChoiceOrder} parentCallBack={callBack} question={4}/>
          </Slide>
          <Slide index={6}>
            <SpecificQuest parentCallBack={callBack} question={5}/>
          </Slide>
          <Slide index={7}>
            <SpecificQuest oldVal={answers.numRestaurantOptions} parentCallBack={callBack} question={6}/>
          </Slide>
          <Slide index={8}>
            <SpecificQuest parentCallBack={populateFirebase} question={7}/>
          </Slide>
        </Slider>
      </CarouselProvider>
      <div class="flex-col flex">
        <Progress completed={prog} />
      </div>
    </div>
  );
  
  
}

export default SlideComponent;