import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView
 } from 'react-native'

 import styled from 'styled-components'

 import TYPOGRAPHY from '@config/typography';
 import colors from '@config/colors';

import CheckBox from '@components/core/CheckBox'  

 class QuestionBox extends Component{
    constructor(props){
        super(props);
        
        this.state= {
            options:{},
            answers: props.answers
        }
    }

    createOptions = (options) => {
        let obj ={};
        for(let a in options){
            obj.push({[a]: false});
        }
        return obj;
    }

    componentWillMount(){
        this.setState({options: this.createOptions(this.props.answers)});
    }

    render(){
        return(
            // <ScrollView>
                <StyledView style={{flex: 1}}>

                    {/*Flat-list por item busca answer por item, (var in a)*/}
                    <CheckBox  checked={this.state.checked} callBack={(a) => this.setState({checked: a})} />
                    <CheckBox  checked={this.state.checked} callBack={(a) => this.setState({checked: a})} />    
                </StyledView>
            // </ScrollView>
                
        );
    }
}

 let StyledView = styled.View`
    flex: 1;
 `;

 export default QuestionBox;