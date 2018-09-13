import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* Components - core */
import Label from '@components/core/Label';

/* Config imports */
import SPACING from '@config/spacing';
import TYPOGRAPHY from '@config/typography';
import COLORS from '@config/colors';

// TODO: Still needs to allow the usage of a different set of font-family
export default (TextInput = props => {
  return [
    props.label && (
      <Label
        key="label"
        width="100%"
        marginTop={props.marginTop}
        paddingTop={0}
        typography={TYPOGRAPHY.regularTextSemibold}
      >
        {props.label}
      </Label>
    ),
    <TextInputStyled
      {...props}
      key="text-input"
      underlineColorAndroid={props.underlineColorAndroid}
      placeholder={props.placeholder}
      selectionColor={props.selectionColor}
    >
      {props.children}
    </TextInputStyled>
  ];
});

const TextInputStyled = styled.TextInput`
  width: ${props => props.width};
  height: ${props => props.height};
  max-height: ${props => props.maxHeight};
  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  margin-top: ${props => (props.label ? 0 : props.marginTop)};
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  border-bottom-width: ${Platform.OS === 'ios' ? 1 : 0};
  color: ${props => props.color};
  border-color: ${props => props.underlineColorAndroid};
  ${props => props.typography};
`;

TextInput.defaultProps = {
  width: '100%',
  height: '50',
  maxHeight: '50',
  color: COLORS.defaultText,
  placeholderTextColor: COLORS.secondaryText,
  paddingTop: SPACING.default,
  paddingBottom: SPACING.default,
  paddingLeft: SPACING.default,
  paddingRight: SPACING.default,
  marginTop: SPACING.default,
  marginBottom: SPACING.default,
  marginLeft: SPACING.default,
  marginRight: SPACING.default,
  backgroundColor: 'transparent',
  borderRadius: 5,
  selectionColor: 'rgba(255, 182, 58, 0.5)',
  underlineColorAndroid: 'black',
  typography: TYPOGRAPHY.regularText
};

TextInput.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  maxHeight: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  typography: PropTypes.array
};
