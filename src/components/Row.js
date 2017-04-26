import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden} from '../lib/helpers';
import {View, DeviceEventEmitter} from 'react-native';

const cloneElements = (props) => {
    const rtl = props.rtl 

    return React.Children.map((rtl ? React.Children.toArray(props.children).reverse() : props.children), (element) => {
      if (!element) return null
      if (element.type.name === 'Row') {
          throw new Error("Row may not contain other Rows as children. Child Rows must be wrapped in a Column.")
      }
      return React.cloneElement(element, {rtl})
    })
}

const layoutSubscription = null;

export default class Row extends React.Component {

  constructor (props) {
    super(props)
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  // left/flex-start is default
  align_X =  (this.props.hAlign === 'space' ? 'space-between' : (this.props.hAlign === 'distribute' ? 'space-around' : (this.props.hAlign === 'center' ? 'center' : (this.props.hAlign === 'right' ? 'flex-end' : 'flex-start'))))
  // top/flex-start is default
  align_Y = (this.props.full && !this.props.vAlign) ? 'stretch' : this.props.vAlign === 'middle' ? 'center' : (this.props.vAlign === 'bottom' ? 'flex-end' : (this.props.vAlign === 'stretch' ? 'stretch' : 'flex-start'))
  
  render() {

    const {
      rtl,
      full,
      nowrap,
      smHidden,
      mdHidden,
      lgHidden,
      hAlign,
      vAlign,
      ...rest
    } = this.props

    try {
        return (
            <View 
              ref={component => this._root = component} {...rest}
              style={[this.props.style,
                      { 
                        flexDirection: 'row',
                        flexWrap: this.props.nowrap ? 'nowrap' : 'wrap',
                        alignItems: this.align_Y,
                        justifyContent: this.align_X,
                        height: (this.props.style && this.props.style.height !== undefined) ? this.props.style.height : (this.props.full ? '100%' : undefined)
                      }]}>
                {cloneElements(this.props)}
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
  full: PropTypes.bool,
  nowrap: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,
  hAlign: PropTypes.string,
  vAlign: PropTypes.string
}