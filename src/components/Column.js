import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden, getComponentWidth, getComponentOffset} from '../lib/helpers';
import {View} from 'react-native';

const Column = (props) => {
    const {
      sm,
      smOffset,
      smHidden,
      md,
      mdOffset,
      mdHidden,
      lg,
      lgOffset,
      lgHidden,
      rowSize,
      ...rest
    } = props;

    const gridProps = {
      sm,
      smOffset,
      smHidden,
      md,
      mdOffset,
      mdHidden,
      lg,
      lgOffset,
      lgHidden,
      rowSize
    };

    if(isHidden(screenSize, gridProps)){
      return null;
    } else {
      return (
        <View
        {...rest}
        style={[
          props.style, {
            width: getComponentWidth(screenSize, gridProps),
            flexDirection: 'column',
            marginLeft: getComponentOffset(screenSize, gridProps)
          }]}>
          {rest.children}
        </View>
      );
    }
};

Column.propTypes = {
  sm: PropTypes.number,
  smOffset: PropTypes.number,
  smHidden: PropTypes.bool,
  md: PropTypes.number,
  mdOffset: PropTypes.number,
  mdHidden: PropTypes.bool,
  lg: PropTypes.number,
  lgOffset: PropTypes.number,
  lgHidden: PropTypes.bool,
};

export default Column;
