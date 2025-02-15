import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native'
import {
    Background,
    ListItem,
    ThemeIcon,
    ThemeTitle,
} from '@components/ComponentsList'
import styled from 'styled-components'

import IconSet from '@components/core/IconSet'

import Header from '@components/Header'

import colors from '@config/colors'
import constants from '@config/constants'

import Icon from 'react-native-vector-icons/FontAwesome5'

import storage from '@utils/storage'

import api from '@utils/api'

/*
    TODO: Add activity indicator to the question loading, it's a quite long
*/


class SelectionScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            done:{},
            _id: props.navigation.getParam('id', null),
            data: []
        }
    }

    _getData = () => {
        if(this.state._id !== null)
            api.mattersByID(this.state._id)
                .then((data) => this.setState({data}))
            
    }

    _done(){
        storage.getStoreItem('done' + this.state._id, (key, val) => {
            if(!val)return;
            val = JSON.parse(val);
            this.setState({done: val});
        });
    }

    componentWillMount(){
        this._done();
        this._getData();
    }

    _param = (el) => {
        return {
            id: el._id,
            parentId: this.state._id,
            name: el.name,
            onSubmit: () => this._done()
        }
    }

    render(){

        return(
            <Background>
                <Header
                    leftComponent={IconSet.back}  
                    leftPress={() => {
                        this.props.navigation.getParam('onReturn', ()=>null)();
                        this.props.navigation.goBack();
                    }}
                    rightComponent={IconSet.history}
                    rightPress={() => this.props.navigation.navigate('HistoryScreen')}
                />
                <ScrollView>
                    <FlatList
                        style={{marginBottom: 15}}
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => 
                            <ListItem onPress={() => this.props.navigation.navigate('SimpleQuestionsScreen', this._param(item))}>
                                <ThemeIcon source={item.image}/>
                                <InfoContainer>
                                    <ThemeTitle2>{item.name}</ThemeTitle2>
                                    <ThemeSubTitle>{item.difficulty}</ThemeSubTitle>
                                </InfoContainer>
                                {(this.state.done[item._id])?(<Done/>):((this.state.done[item._id] === false)?(<Wrong/>):null)}
                            </ListItem>
                        }
                    />
                </ScrollView>
            </Background>

        );
    }
}

let Done = () => <Icon size={30} color="#00aa00" name="check"/>
let Wrong = () => <Icon size={30} color="#ff5500" name="times"/>

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

export default SelectionScreen;