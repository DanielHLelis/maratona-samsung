import React, { Component } from 'react'
import {
    ScrollView
} from 'react-native';
import {

} from 'react-navigation'
import styled from 'styled-components'

import {
    Background
} from '@components/ComponentsList'
import Header from '@components/Header'


class SimpleQuestionsScreen extends Component{


    render(){

        return(
            <Background>
                <Header logged={this.props.logged}
                    leftPress={}

                 />
            </Background>
        );
    }
}