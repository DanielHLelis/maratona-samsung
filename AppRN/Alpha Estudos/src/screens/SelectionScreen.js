import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import {
    Background,
    ListItem,
    ThemeIcon,
    ThemeTitle,
} from '@components/ComponentsList';

import styled from 'styled-components';

import Header from '@components/Header';

import colors from '@config/colors';
import TYPOGRAPHY from '@config/typography';
import images from '@config/images';
import constants from '@config/constants';

class SelectionScreen extends Component{

    constructor(){
        super();
        
        this.state = {
            from: '',
            list: []
        }
    }
    componentWillMount(){
        this.setState({from: this.props.navigation.getParam('theme', 'unknown')});
        this.setState({list: this.props.navigation.getParam('list', '')});
    }

    render(){

        return(
            
            <Background>
                <Header  
                    leftPress={() => this.props.navigation.navigate('MenusScreen')}
                    leftImage={images.SETA}
                    rightImage={images.OPTIONS}
                />
                <ScrollView>
                    <FlatList
                        style={{marginBottom: 15}}
                        data={this.state.list}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => 
                            <ListItem onPress={() => this.props.navigation.navigate('SimpleQuestionsScreen')}>
                                <ThemeIcon source={item.ico}/>
                                <InfoContainer>
                                    <ThemeTitle2>{item.name}</ThemeTitle2>
                                    <ThemeSubTitle>{item.difficulty}</ThemeSubTitle>
                                </InfoContainer>
                                {(item.done)?(<Done/>):(null)}
                            </ListItem>
                        }
                    />
                </ScrollView>
            </Background>

        );
    }
}

let Done = () => <DoneText>✅</DoneText>;

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
    color: green;
    font-size: ${constants.FONT_SIZE.medium};
    font-weight: 400;
    text-align: left;
    margin-right: 10;
`;

export default SelectionScreen;