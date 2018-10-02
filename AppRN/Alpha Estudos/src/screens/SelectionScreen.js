import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    FlatList,
    Dimensions
} from 'react-native'
import {
    Background,
    ListItem,
    ThemeIcon,
    ThemeTitle,
} from '@components/ComponentsList'
import styled from 'styled-components'

import Header from '@components/Header'

import colors from '@config/colors'
import TYPOGRAPHY from '@config/typography'
import images from '@config/images'
import constants from '@config/constants'

import storage from '@utils/storage'

/*
    TODO: Add activity indicator to the question loading, it's a quite long
*/


class SelectionScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            done:{},
            name: props.navigation.getParam('name', 'null'),
            info: this.props.navigation.getParam('info', {matters: {name: '404', difficulty: 'Not Found'}})
        }
    }

    _done(){
        storage.getStoreItem('done' + this.state.name, (key, val) => {
            if(!val)return;
            val = JSON.parse(val);
            this.setState({done: val});
        });
    }

    componentWillMount(){
        this._done();
    }

    render(){

        return(
            <Background>
                <Header  
                    leftPress={() => {
                        this.props.navigation.getParam('onReturn', ()=>null)();
                        this.props.navigation.goBack();
                    }}
                    leftImage={images.SETA}
                    rightImage={images.OPTIONS}
                />
                <ScrollView>
                    <FlatList
                        style={{marginBottom: 15}}
                        data={this.state.info.matters}
                        keyExtractor={(item, index) => toString(index)}
                        renderItem={({ item, index }) => 
                            <ListItem onPress={() => this.props.navigation.navigate('SimpleQuestionsScreen', {section: this.state.name, info: item.questions, name: item.name, onSubmit: () => this._done()})}>
                                <ThemeIcon source={item.image}/>
                                <InfoContainer>
                                    <ThemeTitle2>{item.name}</ThemeTitle2>
                                    <ThemeSubTitle>{item.difficulty}</ThemeSubTitle>
                                </InfoContainer>
                                {(this.state.done[item.name])?(<Done/>):((this.state.done[item.name] === false)?(<Wrong/>):null)}
                            </ListItem>
                        }
                    />
                </ScrollView>
            </Background>

        );
    }
}

let Done = () => <DoneText color="#00aa00">Feito ✅</DoneText>;
let Wrong = () => <DoneText color="#ff5500">❌</DoneText>

let InfoContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: flex-start;
`;

let ThemeTitle2 = styled.Text`
    color: ${colors.defaultText};
    font-size: ${constants.FONT_SIZE.medium};
    font-weight: 400;
    text-align: left;
`;
let ThemeSubTitle = styled.Text`
    color: ${colors.defaultText};
    font-size: ${constants.FONT_SIZE.small};
    font-weight: 400;
    text-align: left;
    margin-top: 0;
    margin-bottom: 0;
`;
let DoneText = styled.Text`
    color: ${props => props.color};
    font-size: ${constants.FONT_SIZE.medium};
    font-weight: 400;
    text-align: left;
    margin-right: 10;
`;

export default SelectionScreen;