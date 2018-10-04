import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text
} from 'react-native'
import styled from 'styled-components'
import Icon from  'react-native-vector-icons/FontAwesome5'

import Header from '@components/Header'
import {
    Background
} from '@components/ComponentsList'

import COLORS from '@config/colors'
import TYPOGRAPHY from '@config/typography'

import storage from '@utils/storage'

let dateFormat = (time) => {
    return (time.day + '/' + time.month + '/' + time.year)
}

export default (HistoryScreen = (props) => (
    <Background>
        <Header 
            logged={props.logged}
            leftPress={() => props.navigation.goBack()}
            leftComponent={
                <Icon
                    size={30}
                    color={COLORS.lightText}
                    name="arrow-left"
                />
            }
        />
        <HistoryBox navigation={props.navigation} />
    </Background>
));

class HistoryBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            a: 'a'
        }
    }

    componentWillMount(){
        storage.getStoreItem('historyItems', (key, val) => {
            this.setState({a: JSON.parse(val)});
        })
    }

    render(){
        return(
            <ScrollView>
                <ListData>
                    <ListTitle>
                        {this.state.a[0].name}
                    </ListTitle>
                    <ListTitle>
                        {dateFormat(this.state.a[0].time)}
                    </ListTitle>
                </ListData>
            </ScrollView>
        );
    }
}

const ListData = styled.View`
    height: 81;
    padding-vertical: 4;
    padding-horizontal: 10;
    justify-content: center;
    width: 100%;
    background-color: ${COLORS.background};
`;

const ListTitle = styled.Text`
    ${TYPOGRAPHY.mediumText}
    color: ${COLORS.defaultText}
`;