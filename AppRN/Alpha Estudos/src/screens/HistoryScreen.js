import React, { Component } from 'react'
import {
    Alert,
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import styled from 'styled-components'
import IconSet from '@components/core/IconSet'

import Header from '@components/Header'
import {
    Background
} from '@components/ComponentsList'

import COLORS from '@config/colors'
import TYPOGRAPHY from '@config/typography'

import storage from '@utils/storage'

import Collapse from 'react-native-collapsible'

/*
    TODO:
        - Add supprot for viewing the question on history + the solve content 
*/

export default class HistoryScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: []
        }
    }

    _update = () => {
        storage.getStoreItem('historyItems', (key, val) => {
                console.log(val);
                this.setState({data: (val)?JSON.parse(val):[]});
        })
    }
    _erase = () => {
        Alert.alert(
            'Cuidado!',
            'Se você apagar o histórico não terá como recuperá-lo!\nTem certeza que deseja limpá-lo?',
            [
                {
                    text:'Apagar',
                    onPress: () => {storage.resetStoreItem('historyItems', this._update);}
                },
                {
                    text:'Cancelar',
                    style: 'cancel'
                }
            ],
            {cancelable: true}
        )
    }

    componentWillMount(){
        this._update();

    }
    render(){
        return(
            <Background>
                <Header 
                    logged={this.props.logged}
                    leftPress={() => this.props.navigation.goBack()}
                    leftComponent={IconSet.back}
                    rightComponent={IconSet.erase}
                    rightPress={this._erase}
                />
                <HistoryBox data={this.state.data} navigation={this.props.navigation} />
            </Background>
        );
    }
    
};

class HistoryBox extends Component{

    constructor(){
        super();

        this.state = {
            collapse: null
        }
    }

    _collapseHandle = (indx) => {
        if(this.state.collapse === indx)
            this.setState({collapse: null});
        else
            this.setState({collapse: indx});
    }

    _questionExtractor = (el) => {
        let obj = [];
        for(let a in el){
            obj.push({title: a, marked: el[a].marked, correct: el[a].correct});
        }
        return obj;
    }

    render(){
        return(
            <ScrollView>
                    {this.props.data.map( (el, indx) => (
                        <View key={indx.toString()}>
                            <TouchableOpacity activeOpacity={0.5} onPress={ () => this._collapseHandle(indx) } >
                                <HistoryItem {...el} />
                            </TouchableOpacity>

                            <Collapse collapsed={!(this.state.collapse === indx)}>
                                <ContentView>
                                    {this._questionExtractor(el.questions).map((el, indx) => (
                                        <ColWrapper key={indx.toString()}>
                                            <ListTitle>{el.title}</ListTitle>
                                            <ListTitle style={el.correct?{color: '#00aa00'}:{color: '#ff5500'}}>{el.marked?el.marked:'💨'}</ListTitle>
                                        </ColWrapper>
                                    ))}
                                </ContentView>
                            </Collapse>    
                        </View>
                    ) )}
            </ScrollView>
        );
    }
}

const formatTime = (d,m,a,h,s) => {
    d = ((d.toString().length===1) ? `0${d}` : d);
    m = ((m.toString().length===1) ? `0${m}` : m);
    a = a.toString();
    h = ((h.toString().length===1) ? `0${h}` : h);
    console.log(s.length);
    s = ((s.toString().length===1) ? `0${s}` : s);
    return `${d}/${m}/${a}  ${h}:${s}`
}

const HistoryItem = props => (
    <ListData {...props}>
        <ColWrapper style={{alignItems: 'flex-start'}}>
            <ListTitle>
                {props.name}
            </ListTitle>
            <ListDate>
               {formatTime(props.time.day, props.time.month, props.time.year, props.time.hour, props.time.minute)}
            </ListDate>
        </ColWrapper>
        <ListDone count={props.done} length={props.total}>
                {Math.floor((props.done/props.total)*100)}%
        </ListDone>
    </ListData>
);

const ContentView = styled.View`
    padding-vertical: 10;
    padding-horizontal: 10;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${COLORS.background};
    border-bottom-width: 1;
    border-bottom-color: #00000030;
`;

const ListData = styled.View`
    height: 81;
    padding-vertical: 4;
    padding-horizontal: 10;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: ${COLORS.background};
    border-bottom-width: 1;
    border-bottom-color: #00000030;
`;

const ColWrapper = styled.View`
    flex-direction: column;
    align-items: center;
`;

const ListTitle = styled.Text`
    ${TYPOGRAPHY.mediumTextSemibold};
    color: ${COLORS.defaultText};
`;

const ListDate = styled.Text`
    ${TYPOGRAPHY.smallTextSemibold}
`;

const ListDone = styled.Text`
    ${TYPOGRAPHY.mediumText}
    font-weight: 400;
    color:${ props => (props.count/props.length === 1)?('#00aa00'):((props.count/props.length >= 0.4)?('#ffca35'):('#ff5500'))};
`;