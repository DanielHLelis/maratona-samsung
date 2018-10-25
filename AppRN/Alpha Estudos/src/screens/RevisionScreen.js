import React, { Component } from 'react'
import {

} from 'react-native'
import styled from 'styled-components'

import IconSet from '@components/core/IconSet'

import {
    Background
} from '@components/ComponentsList'
import Header from '@components/Header'
import Question from '@components/Question'

import Solve from '@components/core/Solve'

import api from '@utils/api'

export default class RevisionScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: props.navigation.getParam('data', null),
            question: {},
            solve: false
        }
        console.log(this.state.data);
    }

    componentWillMount(){
        api.question(this.state.data._id, question => this.setState({question}, () => console.log(question.options)));
    }

    showTip = (val) => this.setState({solve: val})

    render(){
        return(
            <Background>
                <Solve visible={this.state.solve} content={this.state.question.solve} onRequestClose={() => this.showTip(false)} />
                <Header 
                    leftComponent={IconSet.back}
                    leftPress={() => this.props.navigation.goBack()}
                    rightComponent={IconSet.tip}
                    rightPress={() => this.showTip(true)}
                />
                <Question 
                    title={this.state.question.title}
                    enunciado={this.state.question.text}
                    answers={this.state.question.options}
                    imageList={this.state.question.images}
                    marked={this.state.data.marked}
                    disabled
                />

            </Background>
        );
    }


}