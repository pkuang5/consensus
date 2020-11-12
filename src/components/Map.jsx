import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import '../styles/Map.css'
import markerSVG from '../svg/location-pin.svg'

const Marker = ({ text }) => (
    <img class="h-6" src={markerSVG} />
);


function Map(props) {
    return (
        <div className='mapwrapper'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB0S8cwyEpLjdvvpgecFTvdYJgpLBo1Uvs' }}
                defaultCenter={props.center}
                defaultZoom={props.zoom}
            >
                <Marker
                    lat={props.center.lat}
                    lng={props.center.lng}
                    text={props.name}
                />
            </GoogleMapReact>
        </div>
    );
}

export default Map