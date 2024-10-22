import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView
} from 'react-native'
import IconSet from '@components/core/IconSet'
import styled from 'styled-components/native'

import {
    Background,
    ProgressBar
} from '@components/ComponentsList'
import Header from '@components/Header'

import QuestionsList from '@components/QuestionsList'

import typography from '@config/typography'
import colors from '@config/colors'
import storage from '@utils/storage'

const formatTime = (d,m,a,h,s) => {
    d = ((d.toString().length===1) ? `0${d}` : d);
    m = ((m.toString().length===1) ? `0${m}` : m);
    a = a.toString();
    h = ((h.toString().length===1) ? `0${h}` : h);
    s = ((s.toString().length===1) ? `0${s}` : s);
    return `${d}/${m}/${a}  ${h}:${s}`
}
const spentTime = (ms) => `${Math.floor(ms / 60)} minutos e ${ms % 60} segundos`

export default class FinishScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: this.props.navigation.getParam('data', {}),
            update: this.props.navigation.getParam('update', () => null)
        }
    }

    favIcon = () =>(
        this.state.data.favorite
        ? IconSet.starFull
        : IconSet.star
    )

    favToggle = () => {
        let {favorite} = this.state.data
        storage.getStoreItem('historyItems', (key, res) => {
            res = JSON.parse(res);
            if(res === null || res === undefined) res = [];
            
            for(let i = 0; i < res.length; i++){
                if(res[i].startTime == this.state.data.startTime){
                    console.log(res[i], this.state.data.favorite);
                    res[i].favorite = !favorite;
                    break;
                }
            }
            storage.setStoreItem('historyItems', JSON.stringify(res), () => {
                this.setState({data: {...this.state.data, favorite: !favorite}});
                this.state.update();
            }, () => this.setState({data: {...this.state.data, favorite: favorite}}));
        });
    }

    render(){
        let { navigation } = this.props;
        let { data } = this.state;
        // console.log(data);
        return(
            <Background>
                <Header
                    leftComponent={IconSet.back}
                    leftPress={() => navigation.goBack()}
                    rightComponent={<View >{this.favIcon()}</View>}
                    rightPress={this.favToggle}
                />
                <ScrollView>
                    <ReviewBox data={data} navigation={this.props.navigation} />
                </ScrollView>
            </Background>
        )
    }
}

const ReviewBox = ({...props, data}) => {    
    let val = (data.done / data.total).toFixed(2), totalT = Math.floor((data.time.endTime - data.startTime) / 1000);
    console.log(spentTime(totalT));
    return(
        <View>
            <Title>
                {data.name}
            </Title>

            <SubTitle>
                {formatTime(data.time.day, data.time.month, data.time.year, data.time.hour, data.time.minute)}
            </SubTitle>

            <Percentage val={val}>
                {`${val*100}%`}
            </Percentage>

            <StyledBar val={val} />

            <SubTitle>
                Feitos em {spentTime(totalT)}!
            </SubTitle>

            <StyledQuestionsList questions={data.questions} navigation={props.navigation} />
        </View>        
    );
}

const Title = styled.Text`
    ${typography.largeText};
    font-size: 30;
    color: ${colors.defaultText};
    margin-top: 10;
    align-self: center;
    text-align: center;
    max-width: 90%;
`;
const SubTitle = styled.Text`
    ${typography.smallText};
    font-size: 14;
    color: ${colors.defaultText};
    padding-top: 6;
    align-self: center;
    max-width: 80%;
`;

const Percentage = styled.Text`
    color: ${props => (props.val == 1)?('#00aa00'):((props.val >= 0.4)?('#ffca35'):('#ff5500'))};
    ${typography.largeText};
    font-weight: 100;
    align-self: center;
    font-size: 100;
    margin: 10px 0px 0px 0px;
`;

const StyledQuestionsList = styled(QuestionsList)`
    margin: 20px 0 0 0;
`;

const StyledBar = styled(ProgressBar)`
    height: 8;
    width: 75%;
    align-self: center;
    overflow: hidden;
    border-radius: 12;
`;