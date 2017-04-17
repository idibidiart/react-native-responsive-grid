import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden} from '../lib/helpers';
import {View, Alert} from 'react-native';

const refineColPercent = (val) => {
  return (val !== undefined ? Math.max(0, Math.min(val, 100)) : 100)
}

const cloneElements = (props) => {
    const colPercent = refineColPercent(props.colPercent)
    const rtl = props.rtl 

    return React.Children.map((rtl ? React.Children.toArray(props.children).reverse() : props.children), (element) => {
      if (!element) return null
      if (element.type.name === 'Row') {
          throw new Error("Row may not contain other Rows as children. Child Rows must be wrapped in a Column.")
      }
      return React.cloneElement(element, {colPercent: colPercent, rtl: rtl})
    })
}

const Row = (props) => {
  // left/flex-start is default
  const align_X =  (props.hAlign === 'space' ? 'space-between' : (props.hAlign === 'distribute' ? 'space-around' : (props.hAlign === 'center' ? 'center' : (props.hAlign === 'right' ? 'flex-end' : 'flex-start'))))
  // top/flex-start is default
  const align_Y = props.vAlign === 'center' ? 'center' : (props.vAlign === 'bottom' ? 'flex-end' : (props.vAlign === 'fill' ? 'stretch' : 'flex-start'))

  const colPercent = refineColPercent(props.colPercent)

  if (isHidden(screenSize, props)){
    return null;
  } else {
    try {
        return (
            <View {...props}
              style={[props.style,
                      { flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: align_Y,
                        justifyContent: align_X,
                        alignSelf: props.fill ? 'stretch' : undefined
                      }]}>
                {cloneElements(props)}
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

Row.propTypes = {
  colPercent: PropTypes.number,
  rtl: PropTypes.bool,
  fill: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,
  hAlign: PropTypes.string,
  vAlign: PropTypes.string
}

export default Row;