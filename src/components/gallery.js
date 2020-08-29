import React, { useState, useEffect } from 'react';

function Gallery(props) {

    const [index, setIndex] = useState(0)

    return(
        <div class="flex w-full bg-cover bg-center rounded-t-lg" style={{backgroundImage: "url('" + props.images[index] + "')", height: "60vh"}}>
            <div class="w-1/2" onClick={() => {
                if (index != 0) {
                    setIndex(index - 1)
                    props.onSelectIndex(index -1)
                }
            }}/>
            <div class="w-1/2" onClick={() => {
                if (index < props.images.length - 1) {
                    setIndex(index + 1)
                    props.onSelectIndex(index + 1)
                }
            }}/>
        </div>
    )
}

export default Gallery