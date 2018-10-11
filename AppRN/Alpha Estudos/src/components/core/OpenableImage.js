import React, { Component } from 'react'
import {
   Dimensions,
   Modal,
   Image,
   View,
   Text,
   ScrollView,
   TouchableOpacity 
} from 'react-native'
import PropTypes from 'prop-types'

import styled from 'styled-components'

class OpenableImage extends Component{
    constructor(){
        super();

        this.state = {
            fs: false,
        }
    }


    render(){
        return(
                <View>
                    <Modal visible={this.state.fs} transparent onRequestClose={() => this.setState({fs: false})}>
                        <FullScreener {...this.props} onPress={() => this.setState({fs: !this.state.fs})}>
                                <FullScreenImage {...this.props} source={this.props.source} resizeMode='contain' resizeMethod='scale' style={{height: '80%', width: '100%'}} />
                                <SubTitle {...this.props} >{this.props.subtitle}</SubTitle>
                        </FullScreener>
                    </Modal>

                    <TouchableOpacity onPress={() => this.setState({fs: !this.state.fs})}>
                        <Miniatura {...this.props} source={this.props.source} resizeMethod='scale'/>
                    </TouchableOpacity>
                </View>
        );
    };
}

const FullScreener = styled.TouchableOpacity`
    background-color: ${props => props.fullscreenBackgroundColor};
    height: ${Dimensions.get('screen').height};
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const FullScreenImage = styled.Image`
    border-radius: ${props => props.fullscreenBorderRadius};
    border-top-width: ${props => props.fullscreenBorderTopWidth};
    border-right-width: ${props => props.fullscreenBorderRightWidth};
    border-bottom-width: ${props => props.fullscreenBorderBottomWidth};
    border-left-width: ${props => props.fullscreenBorderLeftWidth};
    border-width: ${props => props.fullscreenBorderWidth};
    border-color: ${props => props.fullscreenBorderColor};
`;

const SubTitle = styled.Text`
    font-family: ${props => props.subtitleFontFamily};
    font-size: ${props => props.subtitleFontSize};
    font-weight: ${props => props.subtitleFontWeight};
    text-align: ${props => props.subtitleTextAlign};
    line-height: ${props => props.subtitleLineHeight};
    text-align-vertical: ${props => props.subtitleTextAlignVertical};
    color: ${props => props.subtitleColor};
`;

const Miniatura = styled.Image`
    height: ${props => props.imageHeight};
    width: ${props => props.imageWidth};
    margin-top: ${props => props.imageMarginTop};
    margin-right: ${props => props.imageMarginRight};
    margin-bottom: ${props => props.imageMarginBottom};
    margin-left: ${props => props.imageMarginLeft};
    border-radius: ${props => props.imageBorderRadius};
    border-top-width: ${props => props.imageBorderTopWidth};
    border-right-width: ${props => props.imageBorderRightWidth};
    border-bottom-width: ${props => props.imageBorderBottomWidth};
    border-left-width: ${props => props.imageBorderLeftWidth};
    border-width: ${props => props.imageBorderWidth};
    border-color: ${props => props.imageBorderColor};
`;

OpenableImage.defaultProps = {
    imageHeight: 75,
    imageWidth: 75,
    imageBorderRadius: 37.5,
    imageMarginTop: 0,
    imageMarginRight: 10,
    imageMarginBottom: 10,
    imageMarginLeft: 10,
    imageBorderTopWidth: 0,
    imageBorderRightWidth: 0,
    imageBorderBottomWidth: 0,
    imageBorderLeftWidth: 0,
    imageBorderWidth: 0,
    imageBorderColor: '#fff',

    fullscreenMultiplier: 1,
    fullscreenBackgroundColor: 'rgba(0, 0, 0, 0.6)',
    fullscreenBorderRadius: 0,
    fullscreenBorderTopWidth: 0,
    fullscreenBorderRightWidth: 0,
    fullscreenBorderBottomWidth: 0,
    fullscreenBorderLeftWidth: 0,
    fullscreenBorderWidth: 0,
    fullscreenBorderColor: '#ffffff60',

    subtitleFontFamily: 'Nunito-Light',
    subtitleFontSize: 20,
    subtitleFontWeight: '200',
    subtitleTextAlign: 'center',
    subtitleTextAlignVertical: 'top',
    subtitleLineHeight: 26,
    subtitleColor: '#fff'
}

export default OpenableImage;