import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    FlatList
 } from 'react-native'

 import styled from 'styled-components'

 import TYPOGRAPHY from '@config/typography';
 import colors from '@config/colors';

import CheckBox from '@components/core/CheckBox'  

/* PubSub útil para transferir informaçoes das questões e qual a questão atual */

class QuestionBox extends Component{
    constructor(props){
        super(props);
        
        this.state= {
            options: []
        }
    }

    createOptions = (options) => {
        let obj = [];
        for(let a in options){
            obj.push({
               field: a,
               selected: false,
               data: options[a] 
            });
        }
        return obj;
    }

    componentWillMount(){
        this.setState({options: this.createOptions(this.props.answers)});
    }

    _keyExtractor = (item, index)=>index;

    render(){
        return(
                <StyledView style={{flex: 1}}>
                    <Text>
                        
                    </Text>

                    {this.state.options.map((item, index) => {
                        return <CheckBox {...(index)?({boxBorderTopWidth: 1}):(null)} {...QuestionStyle} key={index} label={item.data} checked={item.selected} callBack={(val) => {
                            let newOptions = this.state.options.map(option => {
                                option.selected = false;

                                if(option.field === item.field) {
                                    option.selected = true;
                                }

                                return option;
                            })

                            this.setState({
                                options: newOptions
                            })
                        }} />
                    })}    
                </StyledView>      
        );
    }
}

 let StyledView = styled.ScrollView`
    flex: 1;
 `;

 let QuestionStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    boxBorderStyle: 'dotted'
 };

 export default QuestionBox;