import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden, getColumnWidth, getColumnOffset} from '../lib/helpers';
import {View, Alert} from 'react-native';

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
      alignY,
      alignX,
      colPercent,
      rtl,
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
      alignY,
      alignX,
      colPercent,
      rtl
    };

    // top/flex-start is default
    const align_Y = (props.alignY === 'center' ? 'center' : (props.alignY === 'bottom' ? 'flex-end' : (props.alignY === 'space' ? 'space-between' : (props.alignY === 'distribute' ? 'space-around' : 'flex-start'))))
    
    // left/flex-start is default
    const align_X = (props.alignX === 'fill' ? 'stretch' : (props.alignX === 'center' ? 'center' : ((props.alignX === 'right' || (props.rtl && props.alignX !== 'left')) ? 'flex-end' : 'flex-start')))

    const cloneElements = (props) => {
        return React.Children.map(props.children, (element) => {
          if (element.type.name === 'Column') {
              throw new Error("Column may not contain another Column. Wrap child Column in Row.")
          }
          return React.cloneElement(element, {})
        })
    }

    if (isHidden(screenSize, gridProps)){
      return null;
    } else {
      try {
        return (
          <View
          {...rest}
          style={[
            props.style, {
              width: getColumnWidth(screenSize, gridProps),
              flexDirection: 'column',
              marginLeft: gridProps.rtl ? 0 : getColumnOffset(screenSize, gridProps),
              marginRight: gridProps.rtl ? getColumnOffset(screenSize, gridProps) : 0,
              alignItems: align_X,
              justifyContent: align_Y
            }]}>
            {cloneElements(rest)}
          </View>
        )
      } catch (e) {
        if (__DEV__) {
          console.error(e)
        }
        return null
      }
    }
}

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
  offset: PropTypes.number,
  alignY: PropTypes.string,
  alignX: PropTypes.string
}

export default Column;
