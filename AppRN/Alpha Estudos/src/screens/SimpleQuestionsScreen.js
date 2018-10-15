import React, { Component } from 'react'
import {
    BackHandler,
    Dimensions,
    Alert,
    View,
    ScrollView
} from 'react-native'
import styled from 'styled-components'

import IconSet from '@components/core/IconSet'

import {
    Background
} from '@components/ComponentsList'

import Header from '@components/Header'
import Question from '@components/Question'

import COLORS from '@config/colors'

import storage from '@utils/storage'
import api from '@utils/api'

class SimpleQuestionsScreen extends Component{
    _didFocus;
    _willBlur;

    constructor(props){
        super(props);

        this.state={
            width: Dimensions.get('screen').width,
            carIndx: 0,
            startTime: 0,
            questions: {},
            _id: props.navigation.getParam('id', null),
            _parentId: props.navigation.getParam('parentId', null),
            data: []
        }
        this._didFocus = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this._backPress)
        );
    }

    _getData = () => {
        if(this.state._id !== null && this.state._parentId !== null)
            this.setState({data: api.questionsByID(this.state._id, this.state._parentId, )}, () => this.setState({questions: this._defineQuestions(this.state.data)}));
        else
            this.props.navigation.goBack();
    }

    _backPress = () =>{
        Alert.alert('Cuidado!', 'Se você sair perderá seu progresso atual, deseja mesmo sair?', [
            {
                text: 'Sair',
                onPress: () => {this.props.navigation.goBack()}
            },
            {
                text: 'Cancelar',
                style: 'cancel'
        }],
        {cancelable: true}
        );
        return true;
    }

    get pagination(){
        return(
            <View
                style={{backgroundColor: COLORS.blueBackground, paddingTop: 0, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
            >
                {
                    this.state.data.map((item, index) => (
                        <Dot key={index.toString()} size={index===this.state.carIndx ? 10 : 8} opacity={index===this.state.carIndx ? 1 : .8} />
                    ))
                }
            </View>
        );
    }

    _setQuestions = (orig, name, val, whitch) => {
        let obj = orig;
            obj[name].correct = val;
            obj[name].marked = whitch;
        return obj;
    }
    _defineQuestions = (options) => {
        let obj = {}
        options.forEach((el) => {
            obj[el.title] = {
                correct: false,
                marked: null,
                _id: el._id
            }
        });
        return obj;
    }
    _count = (obj, test) => {
        let count = 0;
        for(let a in obj){
            if(test(obj[a]))count++;
        }
        return count;
    }

    _addHistory = (callBack = () => null) => {
        storage.getStoreItem('historyItems' , (key, val) => {
            if(!val)
                val = [];
            else
                val = JSON.parse(val);
            let date = new Date();
            val.unshift({
                _themeId: this.state._parentId,
                _matterId: this.state._id,
                time: {
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    endTime: date.getTime()
                },
                startTime: this.state.startTime,
                name: this.props.navigation.getParam('name', 'Unknown'),
                done: this._count(this.state.questions, x=>x.correct),
                total: this.state.data.length,
                questions: this.state.questions,
            });
            
            val.splice(49, 1);

            storage.setStoreItem('historyItems', JSON.stringify(val), callBack, callBack);
        });
    }

    _submit = (callBack) => {
        storage.getStoreItem('done' + this.state._parentId, (key, val) => {
            if(!val)
                val = {};
            else
                val = JSON.parse(val);
            val[this.state._id] = (this.state.data.length === this._count(this.state.questions, x=>x.correct))?true:((val[this.state._id])?(true):(false));

            storage.setStoreItem('done' + this.state._parentId, JSON.stringify(val), callBack, callBack);
        });
    }

    _send = () => Alert.alert('Alerta!', `Uma vez enviado não terá como voltar atrás, deseja mesmo enviar?`, [
        {
            text: 'Enviar',
            onPress: () => {
                this._submit(() => {
                    this._addHistory();
                    this.props.navigation.getParam('onSubmit', () => {})();
                    this.props.navigation.goBack();
                });
            }
        },
        {
            text: 'Cancelar',
            style: 'cancel'
    }],
    {cancelable: true}
    )

    _updateDimension = (val) => {this.setState({width: val.screen.width})}

    componentWillMount(){
        this._getData();
        
    }

    componentDidMount(){
        this._willBlur = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this._backPress)
        );
        this._dimension = Dimensions.addEventListener('change', this._updateDimension);
        this.setState({startTime: new Date().getTime()});
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this._updateDimension);
        this._didFocus && this._didFocus.remove();
        this._willBlur && this._willBlur.remove();
    }

    pagina = (e) => {
        this.setState({carIndx: Math.round(e.nativeEvent.contentOffset.x / this.state.width)});
    }

    render(){
        return(
            <Background>
                <Header 
                    logged={this.props.logged}
                    leftPress={this._backPress}
                    leftComponent={IconSet.back}
                    rightComponent={IconSet.send}
                    rightPress={this._send}
                />
                {this.pagination}
                <ScrollView
                    decelerationRate={0}
                    snapToInterval={this.state.width}
                    snapToAlignment="center"
                    onScroll={this.pagina}
                    horizontal
                    pagingEnabled
                >
                {
                    this.state.data.map((item, index) => (
                        <View key={index.toString()} style={{width: this.state.width}} >
                            <Question
                                title={item.title}
                                enunciado={item.text}
                                answers={item.options}
                                imageList={item.images}
                                correct={item.correct}
                                isCorrect={(val, whitch) => this.setState(this._setQuestions(this.state.questions, item.title, val, whitch))}
                            />
                        </View>
                          
                    ))
                }

                </ScrollView>
            </Background>
        );
    }
}

const Dot = styled.View`
    height: ${props => props.size};
    width: ${props => props.size};
    border-radius: ${props => props.size / 2};
    opacity: ${props => props.opacity};
    background-color: #fff;
    margin-horizontal: ${props => props.size / 2};
`;

export default SimpleQuestionsScreen;