import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

import COLORS from '@config/colors'

const size = 35;

const Icons = {
    back: (
        <Icon
            size={size}
            color={COLORS.lightText}
            name="arrow-left"
        />
    ),
    history: (
        <Icon 
            size={size}
            color={COLORS.lightText}
            name="user-clock"
        />
    ),
    erase: (
        <Icon 
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
        <Icon 
            size={size}
            color={COLORS.lightText}
            name="lightbulb"
        />
    )
}

export default Icons;