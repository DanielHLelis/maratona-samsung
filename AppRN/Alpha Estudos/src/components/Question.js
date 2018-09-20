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

class QuestionBox extends Component{
    constructor(props){
        super(props);
        
        this.state= {
            options:{},
            answers: props.answers,
            opcoes: [
                {
                    campo: "Opcao 1",
                    selecionado: false
                },
                {
                    campo: "Opcao 2",
                    selecionado: false
                },
                {
                    campo: "Opcao 3",
                    selecionado: false
                }
            ]
        }
    }

    createOptions = (options) => {
        let obj ={};
        for(let a in options){
            obj[a] = false;

        }
        return obj;
    }

    componentWillMount(){
        this.setState({options: this.createOptions(this.props.answers)});
    }

    _keyExtractor = (item, index)=>index;

    SelectOptions = (obj)=>{
        let ret = [];
        for(let i in obj){
                ret.push(
                    <CheckBox checked={this.state.options[i]} callBack={(res) => {
                        for(let ob in obj)
                        this.setState({[i]: res});
                    }} />
                );
        }
    }

    render(){
        return(
                <StyledView style={{flex: 1}}>

                    {/*Flat-list por item busca answer por item, (var in a)*/}
                    
                    <Text>{JSON.stringify(this.state.options)}</Text>
                    {this.state.opcoes.map((item, index) => {
                        return <CheckBox key={index} checked={item.selecionado} callBack={(value) => {
                            let newOpcoes = this.state.opcoes;
                            newOpcoes = newOpcoes.map(option => {
                                option.selecionado = false;

                                if(option.campo === item.campo) {
                                    option.selecionado = true;
                                }

                                return option;
                            })

                            this.setState({
                                opcoes: newOpcoes
                            })
                        }} />
                    })}    
                </StyledView>      
        );
    }
}

 let StyledView = styled.View`
    flex: 1;
 `;



 export default QuestionBox;