import React, { Component } from 'react'
import {
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import styled from 'styled-components'

import { createStackNavigator } from 'react-navigation'
import PropTypes from  'prop-types'

import Overlay from 'react-native-overlay'

const ScreenHeight = Dimensions.get('screen').height,
    ScreenWidth = Dimensions.get('screen').width;

class ImageSlider extends Component{
    render(){
        return(
            <ScrollView>
                <Slider>
                    {this.props.imageList.map((item, index) =>
                        <ZoomableImage key={index} source={item.image}/>
                    )}
                </Slider>
            </ScrollView>
            
        );
    }
}

class ZoomableImage extends Component{
    constructor(){
        super();

        this.state = {
            fs: false
        }
    }

    render(){
        return(
            <TouchableOpacity style={(this.state.fs)?{height: ScreenHeight, width: ScreenWidth, backgroundColor: '#000', position: 'absolute', top: 0, left: 0, zIndex: 100}:null} onPress={() => this.setState({fs: !this.state.fs})}>
                {(this.state.fs)?(
                    <Overlay isVisible={this.state.fs}>
                        <Miniatura source={this.props.source} resizeMethod='scale' style={{/*height: ScreenHeight, */width: ScreenWidth}}/>
                    </Overlay>
                ):(
                    <Miniatura source={this.props.source} resizeMethod='scale'/>
                )}
            </TouchableOpacity>
        );
    }
};

let Miniatura = styled.Image`
    height: 50;
    width: 50;
    padding-left: 20;
    padding-right: 20;
`;

let Slider = styled.View`
    flex-direction: row;
`;

// ImageSlider.propTypes = {
//     navigator: PropTypes.any.isRequired
// }

export default ImageSlider;