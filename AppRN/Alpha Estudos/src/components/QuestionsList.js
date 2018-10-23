import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import QuesExtractor from '@utils/extractor'

import TYPOGRAPHY from '@config/typography'
import COLORS from '@config/colors'



const QuestionsList = (props) => (
    <ContentView style={props.style}>
        {QuesExtractor(props.questions).map((el, indx) => (
            <TouchableOpacity key={indx.toString()} style={{width: '33%'}} onPress={() => props.navigation.navigate('RevisionScreen', {data: el})}>
                <ColWrapper >
                    <ListTitle>{el.title}</ListTitle>
                    {el.marked?
                        (el.correct
                            ?(<Icon size={30} color="#00aa00" name="check"/>)
                            :(<Icon size={30} color="#ff5500" name="times"/>)
                        )
                        :(<Icon size={30} color="#adadad" name="window-minimize"/>)
                    }
                </ColWrapper>
            </TouchableOpacity>
        ))}
    </ContentView>
)


const ContentView = styled.View`
    padding-vertical: 10;
    padding-horizontal: 10;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${COLORS.background};
    border-bottom-color: #00000030;
`;

const ColWrapper = styled.View`
    padding-vertical: 10;
    flex-direction: column;
    align-items: center;
`;

const ListTitle = styled.Text`
    ${TYPOGRAPHY.mediumTextSemibold};
    color: ${COLORS.defaultText};
`;

export default QuestionsList;