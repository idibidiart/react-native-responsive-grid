import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden} from '../lib/helpers';
import {View, Alert} from 'react-native';

const cloneElements = (props) => {
    const rtl = props.rtl 
    const cell = props.cell

    return React.Children.map((rtl ? React.Children.toArray(props.children).reverse() : props.children), (element) => {
      if (!element) return null
      if (element.type.name === 'Row') {
          throw new Error("Row may not contain other Rows as children. Child Rows must be wrapped in a Column.")
      }
      return React.cloneElement(element, {rtl: rtl, cell: cell})
    })
}

const Row = (props) => {
  // left/flex-start is default
  const align_X =  (props.hAlign === 'space' ? 'space-between' : (props.hAlign === 'distribute' ? 'space-around' : (props.hAlign === 'center' ? 'center' : (props.hAlign === 'right' ? 'flex-end' : 'flex-start'))))
  // top/flex-start is default
  const align_Y = (props.cell && !props.vAlign) ? 'stretch' : props.vAlign === 'middle' ? 'center' : (props.vAlign === 'bottom' ? 'flex-end' : (props.vAlign === 'stretch' ? 'stretch' : 'flex-start'))

  if (isHidden(screenSize, props)){
    return null;
  } else {
    try {
        return (
            <View {...props}
              style={[props.style,
                      { flexDirection: 'row',
                        flexWrap: props.nowrap ? 'nowrap' : 'wrap',
                        alignItems: align_Y,
                        justifyContent: align_X,
                        height: (props.style && props.style.height !== undefined) ? props.style.height : (props.cell ? '100%' : undefined)
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
  rtl: PropTypes.bool,
  cell: PropTypes.bool,
  nowrap: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,
  hAlign: PropTypes.string,
  vAlign: PropTypes.string,
}

export default Row;