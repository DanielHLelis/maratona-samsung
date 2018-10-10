import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import COLORS from '@config/colors'

 class CheckBox extends Component{
    render(){
        return(
            <Container activeOpacity={1} onPress={() => {this.props.callBack(!this.props.checked);}} {...this.props}>
                <Box {...this.props} onPress={() => {this.props.callBack(!this.props.checked);}} />
                <Label {...this.props} onPress={() => {this.props.callBack(!this.props.checked);}} >{this.props.label}</Label>
            </Container>
        )
    }   

 }

let Container = styled.TouchableOpacity`
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    margin-left: ${props => props.marginLeft};
    margin-right: ${props => props.marginRight};
    padding-top: ${props => props.paddingTop};
    padding-bottom: ${props => props.paddingBottom};
    padding-left: ${props => props.paddingLeft};
    padding-right: ${props => props.paddingRight};
    display: flex;
    top: ${props => props.top};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    right: ${props => props.right};
    flex-direction: ${props => props.flexDirection};
    align-items: ${props => props.alignItems}; 
    justify-content: ${props => props.justifyContent}; 
    /* flex: ${props => props.flex}; */
    border-width: ${props => props.boxBorderWidth};
    border-color: ${props => props.boxBorderColor};
    border-style: ${props => props.boxBorderStyle};
    border-radius: ${props => props.boxBorderRadius};
    border-top-width: ${props => props.boxBorderTopWidth};
    border-right-width: ${props => props.boxBorderRightWidth};
    border-bottom-width: ${props => props.boxBorderBottomWidth};
    border-left-width: ${props => props.boxBorderLeftWidth};    
    width: 100%;
`;

let Box = styled.TouchableOpacity`
    height: ${props => props.size};
    width: ${props => props.size};
    border-radius: ${props => (props.checkType === 'circle')?(props.size * 0.5):(props.size * 0.1)};
    background-color: ${props => (props.checked)?(props.color):('transparent')};
    border-width: ${props => props.borderWidth};
    border-color: ${props => props.color};
    /* box-sizing: border-box; */
`;

let Label = styled.Text`
    font-family: ${props => props.labelFontFamily};
    font-weight: ${props => props.labelFontWeight};
    font-size: ${props => props.labelFontSize};
    text-align: ${props => props.labelAlign};
    text-align-vertical: ${props => props.labelAlignVertical};
    color: ${props => props.labelColor};
    margin-top: ${props => props.labelMarginTop};
    margin-right: ${props => props.labelMarginRight};
    margin-bottom: ${props => props.labelMarginBottom};
    margin-left: ${props => props.labelMarginLeft};
    line-height: ${props => props.lineHeight};
`;

CheckBox.defaultProps = {
    checked: false,
    size: 20,
    checkType: 'circle',
    color: COLORS.blueBackground,
    borderWidth: 2,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 40,
    paddingBottom: 0,
    paddingLeft: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    labelMarginTop: 0,
    labelMarginRight: 0,
    labelMarginBottom: 0,
    labelMarginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    labelFontFamily: 'Nunito-Regular',
    labelFontWeight: '200',
    labelFontSize: 18,
    labelColor: COLORS.defaultText,
    labelAlign: 'justify',
    labelAlignVertical: 'center',
    callBack: ()=>alert('Puts, não era para isso ter acontecido, culpa do dev! Urgh'),
    boxHeight: 'auto',
    boxWidth: 'auto',
    boxBorderWidth: 0,
    boxBorderColor: COLORS.defaultText,
    boxBorderStyle: 'solid',
    boxBorderRadius: 10,
    boxBorderTopWidth: 0,
    boxBorderRightWidth: 0,
    boxBorderBottomWidth: 0,
    boxBorderLeftWidth: 0,
    lineHeight: 24
}

CheckBox.propTypes = {
    checked: PropTypes.bool,
    size: PropTypes.number,
    type: PropTypes.string,
    color: PropTypes.string,
    borderWidth: PropTypes.number,
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    labelMarginTop: PropTypes.number,
    labelMarginRight: PropTypes.number,
    labelMarginBottom: PropTypes.number,
    labelMarginLeft: PropTypes.number,
    callBack: PropTypes.func,
    flexDirection: PropTypes.string,
    alignItems: PropTypes.string,
    justifyContent: PropTypes.string,
    flex: PropTypes.string,
    labelFontFamily: PropTypes.string,
    labelFontWeight: PropTypes.string,
    labelFontSize: PropTypes.number,
    labelColor: PropTypes.string,
    labelAlign: PropTypes.string,
    labelAlignVertical: PropTypes.string
}

export default CheckBox;