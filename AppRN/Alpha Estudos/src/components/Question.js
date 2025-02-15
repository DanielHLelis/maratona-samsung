import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    FlatList
 } from 'react-native'

import styled from 'styled-components'

import PropTypes from 'prop-types'

import TYPOGRAPHY from '@config/typography';
import colors from '@config/colors';

import CheckBox from '@components/core/CheckBox'  

import ImageSlider from '@components/ImageSlider'

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
               selected: (a===this.props.marked),
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
                <StyledView>
                    <Enunciado>
                        {' '}<B>{'('+this.props.title+')'}  </B>{this.props.enunciado}
                    </Enunciado>

                    <ImageSlider imageList={this.props.imageList}/>

                    {this.state.options.map((item, index) => {
                        return(
                        <CheckBox {...(index)?({boxBorderTopWidth: 1}):(null)} {...QuestionStyle} key={index} label={item.data} checked={item.selected} callBack={this.props.disabled?() => null:(val) => {
                            let newOptions = this.state.options.map(option => {
                                option.selected = false;

                                if(option.field === item.field) {
                                    option.selected = true;
                                    if(item.field === this.props.correct)this.props.isCorrect(true, item.field);
                                    else this.props.isCorrect(false, item.field);
                                }

                                return option;
                            })

                            this.setState({
                                options: newOptions
                            })
                        }
                    } />)
                    })}    
                </StyledView>      
        );
    }
};

QuestionBox.propTypes = {
    isCorrect: PropTypes.func
};
QuestionBox.defaultProps = {
    isCorrect: () => null
}

let Enunciado = styled.Text`
    ${TYPOGRAPHY.mediumText};
    padding-horizontal: 10;
    padding-bottom: 20;
    color: #222;
    text-align: justify;
    line-height: 26;
`;
let B = styled.Text`
    font-weight: bold;
`;


let StyledView = styled.ScrollView`
    flex: 1;
    background-color: ${colors.background};
    border-radius: 10;
 `;

 let QuestionStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    boxBorderStyle: 'solid'
 };

// QuestionBox.propTypes = {
//     navigator: PropTypes.any.isRequired
// }

 export default QuestionBox;