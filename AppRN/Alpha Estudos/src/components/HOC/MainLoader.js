import React, { Component } from 'react'
import {

} from 'react-native'
import styled from 'styled-components/native'

const MainLoader = (loadedProp, LoadingScreen) => (Component) => {
    return class extends Component{

        render(){
            return(
                this.props[loadedProp]
                ? <Component {...this.props} />
                : <LoadingScreen {...this.props} />
            )
        }

    }
}