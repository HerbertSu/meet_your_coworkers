import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({box, imageUrl}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id="inputimage" src={imageUrl} width='500px' height='auto' alt="Not found"/>
                <div className='bounding-box' style={{top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                    {/* <img src="https://cdn.shopify.com/s/files/1/0885/7466/products/smiley-decal_1024x1024.png?v=1434998018" alt="smiley"/> */}
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;