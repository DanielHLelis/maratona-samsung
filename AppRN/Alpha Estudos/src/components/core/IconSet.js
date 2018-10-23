import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome'

import COLORS from '@config/colors'

const size = 35;

const Icons = {
    back: (
        <Icon5
            size={size}
            color={COLORS.lightText}
            name={Platform.OS === 'ios'? "chevron-left" : "arrow-left"}
            style={Platform.OS === 'ios'?{
                transform: [{translateX: -10}]
            }:null}
        />
    ),
    history: (
        <Icon5 
            size={size}
            color={COLORS.lightText}
            name="user-clock"
        />
    ),
    erase: (
        <Icon5 
            size={size}
            color={COLORS.lightText}
            name="eraser"
        />
    ),
    send: (
        <Icon 
            size={size}
            color={COLORS.lightText}
            name="check-circle"
        />
    ),
    tip: (
        <Icon5 
            size={size}
            color={COLORS.lightText}
            name="lightbulb"
        />
    ),
    star: (
        <Icon 
            size={size}
            color={COLORS.lightText}
            name="star-o"
        />
    ),
    starFull: (
        <Icon 
            size={size}
            color={COLORS.lightText}
            name="star"
        />
    )
}

const _IconSet = (ic) => {
    let newIc = ic;

    for(let inx in newIc){
        newIc[inx] = (
            <View style={{height: size + 10, width: size + 10, alignItems: 'center', justifyContent: 'center'}} >
                {newIc[inx]}
            </View>
        );
    }
    
    return newIc;
}

const IconSet = _IconSet(Icons);

export default Icons;