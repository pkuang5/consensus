import React, { useState, useEffect } from 'react';
import yelpREST from '../api/yelp'
import Gallery from './gallery'
import 'font-awesome/css/font-awesome.min.css'

function Restaurant(props) {

    const [imageArray, setImageArray] = useState([])
    const [restName, setRestName] = useState("")
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        yelpREST(`/businesses/${props.id}`).then(({ data }) => {
            setRestName(data.name)
            data.photos.forEach(image => {
                setImageArray(imageArray => [...imageArray, image])
            });
        })
    } ,[]);

    return(
        <React.Fragment>
            <div class="flex w-2/3 flex-col items-center mt-32 shadow rounded-lg p-3 border border-red-500">
                <Gallery images={imageArray} onSelectIndex={(index) => setImageIndex(index)}/>
                <div class = "w-full text-md text-center font-serif text-lg">
                    {restName}
                </div>
            </div>
            <div class="flex mt-10">
                {imageArray.map((stud, index) => 
                    (index==imageIndex) ? <i class="fa fa-circle"></i>:<i class="fa fa-stop-circle fa-lg mr-2"></i>
                )}
            </div>
        </React.Fragment>

    )
}

export default Restaurant