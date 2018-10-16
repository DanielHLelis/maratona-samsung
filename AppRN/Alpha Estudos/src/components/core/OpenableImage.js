import React, { Component } from 'react'
import {
   Dimensions,
   Modal,
   Image,
   View,
   Text,
   SafeAreaView,
   TouchableOpacity,
   Animated,
   PanResponder
} from 'react-native'
import PhotoView from 'react-native-photo-view'

import Icon from 'react-native-vector-icons/FontAwesome5'

import PropTypes from 'prop-types'

import styled from 'styled-components'

class OpenableImage extends Component{
    constructor(){
        super();

        this.state = {
            fs: false,
            width: Dimensions.get('screen').width,
            animation: {
                pos: new Animated.Value(-120),
                opacity: new Animated.Value(0)
            }
        }

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, et) => true,
            onStartShouldSetPanResponderCapture: (e, et) => true,
            onMoveShouldSetPanResponder: (e, et) => true,
            onMoveShouldSetPanResponderCapture: (e, et) => true,

            onPanResponderMove: (e, et) => {
                let abs = Math.abs(et.dy);
                Animated.timing(
                    this.state.animation.pos,
                    {
                        toValue: et.dy,
                        duration: 0
                    }
                ).start();
                Animated.timing(
                    this.state.animation.opacity,
                    {
                        toValue: (abs > 120) ? 0 : Math.abs(abs - 120) / 120,
                        duration: 0
                    }
                ).start();
            },

            onPanResponderRelease: (e, et) => {
                if(et.dy < -80)
                    this.close();
                else if(et.dy > 80)
                    this.disappearDown(() => this.setState({fs: false}))
                else {
                    Animated.timing(
                        this.state.animation.pos,
                        {
                            toValue: 0,
                            duration: 100
                        }
                    ).start();
                    Animated.timing(
                        this.state.animation.opacity,
                        {
                            toValue: 1,
                            duration: 100
                        }
                    ).start();
                }
            }
        })
    }

    handleWidth = (val) => {
        this.setState({width: val.screen.width});
    }

    componentWillMount(){
        Dimensions.addEventListener('change', this.handleWidth);
    }
    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.handleWidth);
    }


    appear = (cb = () => null) => {
        Animated.timing(
            this.state.animation.pos,
            {
                toValue: 0,
                duration: 300
            }
        ).start()
        Animated.timing(
            this.state.animation.opacity,
            {
                toValue: 1,
                duration: 300
            }
        ).start()
    }

    disappear = (cb = () => null) => {
        Animated.timing(
            this.state.animation.pos,
            {
                toValue: -120,
                duration: 300
            }
        ).start()
        Animated.timing(
            this.state.animation.opacity,
            {
                toValue: 0,
                duration: 300
            }
        ).start(cb)
    }
    disappearDown = (cb = () => null) => {
        Animated.timing(
            this.state.animation.pos,
            {
                toValue: 120,
                duration: 300
            }
        ).start()
        Animated.timing(
            this.state.animation.opacity,
            {
                toValue: 0,
                duration: 300
            }
        ).start(cb)
    }

    close = () => {
        this.disappear(() => this.setState({fs: false}));
    }

    open = () => {
        this.setState({fs: true});
        this.appear();
    }

    _getImageHeight = (image, wid) => {
        let ar = 1;
        if(image.uri){
            Image.getSize(image.uri, (w, h) => {
                ar = h / w;
            }, () => null);
        }else {
            let {width, height} = Image.resolveAssetSource(image);
            if(height && width) ar = height / width
        }

        return (ar * wid);
    }

    FullScreenImage = (props) => ({
        borderRadius: props.fullscreenBorderRadius,
        borderTopWidth: props.fullscreenBorderTopWidth,
        borderRightWidth: props.fullscreenBorderRightWidth,
        borderBottomWidth: props.fullscreenBorderBottomWidth,
        borderLeftWidth: props.fullscreenBorderLeftWidth,
        borderWidth: props.fullscreenBorderWidth,
        borderColor: props.fullscreenBorderColor,
        zIndex: 8
    })

    AHnimated = Animated.createAnimatedComponent(AH);



    render(){
        return(
                <View>
                    <Modal visible={this.state.fs} transparent onRequestClose={this.close}>
                        <FullScreener {...this.props} >
                                <this.AHnimated {...this.props} style={{opacity: this.state.animation.opacity}} activeOpacity={1} onPress={this.close} />
                                <View {...this._panResponder.panHandlers}>
                                    <Animated.View style={{opacity: this.state.animation.opacity, transform: [{translateY: this.state.animation.pos}]}} >
                                        <PhotoView 
                                            {...this.props}
                                            style={[
                                                this.FullScreenImage(this.props),
                                                {height: this._getImageHeight(this.props.source, this.state.width), width: this.state.width}
                                            ]}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            minimumZoomScale={1} 
                                            maximumZoomScale={5} 
                                            androidScaletype='center'
                                            source={this.props.source}
                                        />
                                        <SubTitle {...this.props} >{this.props.subtitle}</SubTitle>
                                    </Animated.View>
                                </View>
                        </FullScreener>
                    </Modal>

                    <TouchableOpacity onPress={this.open}>
                        <Miniatura {...this.props} source={this.props.source} resizeMethod='scale'/>
                    </TouchableOpacity>
                </View>
        );
    }
}

const AH = styled.TouchableOpacity`
    position: absolute;
    background-color: ${props => props.fullscreenBackgroundColor};
    height: 100%;
    width: 100%;
`;

const FullScreener = styled.View`
    background-color: transparent;
    height: 100%;
    flex: 1;
    z-index: 6;
    align-items: center;
    justify-content: center;
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