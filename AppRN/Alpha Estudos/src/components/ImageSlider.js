import React from 'react'
import {
    ScrollView
} from 'react-native'

import OpenableImage from '@components/core/OpenableImage'


const ImageSlider = (props) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {(props.imageList !== undefined && props.imageList !== null) ? 
        props.imageList.map((item, index) =>
            <OpenableImage key={index} source={item.image} imageBorderWidth={1} imageBorderColor="rgba(0, 0, 0, 0.4)" subtitle={item.subtitle}/>
        ): null}
    </ScrollView>
);

export default ImageSlider;