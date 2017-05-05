import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScreenInfo} from '../lib/ScreenInfo';
import {isHidden} from '../lib/helpers';
import {View, DeviceEventEmitter} from 'react-native';

const cloneElements = (props, eventKey) => {
    const rtl = props.rtl 

    return React.Children.map((rtl ? React.Children.toArray(props.children).reverse() : props.children), (element) => {
      if (!element) return null
      if (element.type.name === 'Row') {
          throw new Error("Row may not contain other Rows as children. Child Rows must be wrapped in a Column.")
      }
      return React.cloneElement(element, {rtl, eventKey})
    })
}

export default class Row extends React.Component {
  constructor(props, context) {
      super (props, context)

      this.eventKey =  +new Date() + "_" + Math.random()

      this.animationHandle 
      this.sub = DeviceEventEmitter.addListener('layout_change_' + this.eventKey, (e) => {
          cancelAnimationFrame(this.animationHandle)
          this.animationHandle = requestAnimationFrame(() => {
              this.setState({layoutTriggered: +new Date()})
          })
      })
  }

  componentWillUnmount() {
      this.sub.remove()
      cancelAnimationFrame(this.animationHandle)
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  static propTypes = {
    rtl: PropTypes.bool,
    fullHeight: PropTypes.bool,
    wrap: PropTypes.bool,
    smHidden: PropTypes.bool,
    mdHidden: PropTypes.bool,
    lgHidden: PropTypes.bool,
    hAlign: PropTypes.string,
    vAlign: PropTypes.string,
    alignLines: PropTypes.string
  }

  // left/flex-start is default
  align_X =  (this.props.hAlign === 'space' ? 'space-between' : (this.props.hAlign === 'distribute' ? 'space-around' : (this.props.hAlign === 'center' ? 'center' : (this.props.hAlign === 'right' ? 'flex-end' : 'flex-start'))))
  // top/flex-start is default
  align_Y = this.props.vAlign == 'stretch' ? 'stretch' : this.props.vAlign === 'middle' ? 'center' : (this.props.vAlign === 'bottom' ? 'flex-end' : 'flex-start')
  
  align_lines = this.props.wrap && this.props.alignLines && (this.props.alignLines === 'top' ? 
                                                          'flex-start' : 
                                                          (this.props.alignLines === 'bottom' ? 'flex-end' : 
                                                              (this.props.alignLines === 'middle' ? 'center' : 
                                                                (this.props.alignLines === 'space' ? 'space-between' : 
                                                                  (this.props.alignLines === 'distribute' ? 'space-around' 
                                                                    : 'stretch')))))

  wrapState = this.props.wrap ? 'wrap' : 'nowrap'

  height = (this.props.style && this.props.style.height !== undefined) ? this.props.style.height : (this.props.fullHeight ? '100%' : undefined)

  render() {

    const {
      rtl,
      fullHeight,
      wrap,
      smHidden,
      mdHidden,
      lgHidden,
      hAlign,
      vAlign,
      alignLines,
      ...rest
    } = this.props

    try {
        return (
            <View 
              ref={component => this._root = component} {...rest}
              style={[this.props.style,
                      { 
                        flexDirection: 'row',
                        alignContent: this.align_lines, 
                        flexWrap: this.wrapState,
                        alignItems: this.align_Y,
                        justifyContent: this.align_X,
                        height: this.height
                      }]}>
                {cloneElements(this.props, this.eventKey)}
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