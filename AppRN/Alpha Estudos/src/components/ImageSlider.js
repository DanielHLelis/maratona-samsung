import React from 'react'
import {
    ScrollView
} from 'react-native'

import OpenableImage from '@components/core/OpenableImage'


const ImageSlider = (props) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.imageList.map((item, index) =>
            <OpenableImage key={index} source={item.image} subtitle={"Some Test Subtitle, [Cefet, Brasil, 2018, I don't know]"}/>
        )}
    </ScrollView>
);

export default ImageSlider;