import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import '../styles/Map.css'

const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'white',
        background: 'grey',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);


function Map(props) {
    return (
        <div className='mapwrapper'>
            <GoogleMapReact
                defaultCenter={props.center}
                defaultZoom={props.zoom}
            >
                <AnyReactComponent
                    lat={props.center.lat}
                    lng={props.center.lng}
                    text={props.name}
                />
            </GoogleMapReact>
        </div>
    );
}

export default Map