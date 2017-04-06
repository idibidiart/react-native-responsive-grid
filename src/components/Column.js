import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden, getColumnWidth, getColumnOffset} from '../lib/helpers';
import {View} from 'react-native';

const Column = (props) => {
    const {
      size,
      offset,
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
      size,
      offset,
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

    const justifyContent = (props.alignVertical === 'top' ? 'flex-start' : (props.alignVertical === 'bottom' ? 'flex-end' : (props.alignVertical === 'space' ? 'space-between' : (props.alignVertical === 'distribute' ? 'space-around' : 'center' ))))

    if (isHidden(screenSize, gridProps)){
      return null;
    } else {
      return (
        <View
        {...rest}
        style={[
          props.style, {
            width: getColumnWidth(screenSize, gridProps),
            flexDirection: 'column',
            marginLeft: getColumnOffset(screenSize, gridProps),
            justifyContent: justifyContent,
            alignItems: 'flex-start'
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
  size: PropTypes.number,
  offset: PropTypes.number
};

export default Column;
