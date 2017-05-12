import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScreenInfo} from '../lib/ScreenInfo';
import {isHidden} from '../lib/helpers';
import {View, DeviceEventEmitter, InteractionManager} from 'react-native';

export default class Row extends React.Component {
  constructor(props, context) {
      super (props, context)
  }

  cloneElements = (props) => {
    const rtl = props.rtl 

    return React.Children.map((rtl ? React.Children.toArray(props.children).reverse() : props.children), (element) => {
      if (!element) return null
      if (element.type && element.type.name === 'Row') {
          throw new Error("Row may not contain other Rows as children. Child Rows must be wrapped in a Column.")
      } else if (element.type && element.type.name !== 'Column') {
        return element
      } else {
        return React.cloneElement(element, {rtl})
      }
    })
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  static propTypes = {
    rtl: PropTypes.bool,
    fullHeight: PropTypes.bool,
    fullWidth: PropTypes.bool,
    wrap: PropTypes.bool,
    hAlign: PropTypes.string,
    vAlign: PropTypes.string,
    alignLines: PropTypes.string,
    layoutEvent: PropTypes.string
  }

  render() {

    const {
      rtl,
      fullHeight,
      fullWidth,
      wrap,
      hAlign,
      vAlign,
      alignLines,
      layoutEvent,
      ...rest
    } = this.props

    // expose these static props for testing
    // left/flex-start is default
    this.alignX =  (hAlign === 'space' ? 'space-between' : (hAlign === 'distribute' ? 'space-around' : (hAlign === 'center' ? 'center' : (hAlign === 'right' ? 'flex-end' : 'flex-start'))))
    // top/flex-start is default
    this.alignY = vAlign == 'stretch' ? 'stretch' : vAlign === 'middle' ? 'center' : (vAlign === 'bottom' ? 'flex-end' : 'flex-start')
    this.alignLines = wrap && alignLines && (alignLines === 'top' ? 
                                                            'flex-start' : 
                                                            (alignLines === 'bottom' ? 'flex-end' : 
                                                                (alignLines === 'middle' ? 'center' : 
                                                                  (alignLines === 'space' ? 'space-between' : 
                                                                    (alignLines === 'distribute' ? 'space-around' 
                                                                      : 'stretch')))))
    this.wrapState = wrap ? 'wrap' : 'nowrap'
    this.height = fullHeight ? '100%' : (this.props.style && this.props.style.height !== undefined) ? this.props.style.height : undefined
    this.width = fullWidth ? '100%' : (this.props.style && this.props.style.width !== undefined) ? this.props.style.width : undefined

    try {
        return (
            <View 
              onLayout={(e)=> {
                    e.persist()
                    InteractionManager.runAfterInteractions(() => {
                        this.setState({layoutTriggered: +new Date()})
                        if (layoutEvent) {
                            DeviceEventEmitter.emit(layoutEvent, {
                                                      screenInfo: ScreenInfo(), 
                                                      elementInfo: e.nativeEvent.layout
                                                      })
                        }
                    })
   
                }
              }
              ref={component => this._root = component} {...rest}
              style={[this.props.style,
                      { 
                        flexDirection: 'row',
                        alignContent: this.alignLines, 
                        flexWrap: this.wrapState,
                        alignItems: this.alignY,
                        justifyContent: this.alignX,
                        height: this.height,
                        width: this.width,
                        position: 'relative'
                      }]}>
                {this.cloneElements(this.props)}
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