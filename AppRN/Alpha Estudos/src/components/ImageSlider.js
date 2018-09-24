import React from 'react'
import {
    ScrollView
} from 'react-native'

import OpenableImage from '@components/core/OpenableImage'


const ImageSlider = (props) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.imageList.map((item, index) =>
            <OpenableImage key={index} source={item.image} subtitle={item.subtitle}/>
        )}
    </ScrollView>
);

export default ImageSlider;