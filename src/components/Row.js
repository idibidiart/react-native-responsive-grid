import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScreenInfo} from '../lib/ScreenInfo';
import {isHidden} from '../lib/helpers';
import {View, DeviceEventEmitter, InteractionManager} from 'react-native';

export default class Row extends React.Component {
  constructor(props, context) {
      super (props, context)
  }

  callback = (e) => {
      const event = {
                      screenInfo: ScreenInfo(), 
                      rowInfo: e.nativeEvent.layout
                    }
      if (this.props.layoutEvent) {
        DeviceEventEmitter.emit(this.props.layoutEvent, event)
      } else {
        this.setState({layoutEvent: 1})
      }
  }

  cloneElements = (props) => {
    const rtl = props.rtl 

    return React.Children.map((rtl ? React.Children.toArray(props.children).reverse() : props.children), (element) => {
      if (!element) return null
      if (element.type && (element.type.name === 'Row'|| (element.props.style && element.props.style.flexDirection === 'row'))) {
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
    alignSelf: PropTypes.string,
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

    this.flex =  this.props.style && this.props.style.flex !== undefined ? this.props.style.flex : 0
    this.wrapState = wrap ? 'wrap' : 'nowrap'
    this.height = fullHeight ? '100%' : (this.props.style && this.props.style.height !== undefined) ? this.props.style.height : undefined
    this.width = fullWidth ? '100%' : (this.props.style && this.props.style.width !== undefined) ? this.props.style.width : undefined

    if (rtl && !hAlign) {
      this.hAlign = 'flex-end'
    } else {
      switch (hAlign) {
        case 'space': 
          this.hAlign = 'space-between' 
          break;
        case 'distribute':
          this.hAlign = 'space-around'  
          break;
        case 'center': 
          this.hAlign = 'center' 
          break; 
        case 'right': 
          this.hAlign = 'flex-end' 
          break;
        default: 
          this.hAlign = 'flex-start'
      }
    }

    switch (vAlign) {
      case 'stretch': 
        this.vAlign = 'stretch' 
        break;
      case 'middle':
        this.vAlign = 'center' 
        break; 
      case 'bottom': 
        this.vAlign = 'flex-end' 
        break;
      case 'baseline':
        this.vAlign = 'baseline'
        break; 
      default: 
        this.vAlign = 'flex-start'
    }

    if (wrap && alignLines) {
      switch (alignLines) {
        case 'top': 
          this.alignLines = 'flex-start' 
          break;
        case 'bottom':
          this.alignLines = 'flex-end' 
          break; 
        case 'middle': 
          this.alignLines = 'center'  
          break;
        case 'space': 
          this.alignLines = 'space-between' 
          break;  
        case 'distribute': 
          this.alignLines = 'space-around'
          break;  
        default: 
          this.alignLines = 'stretch'
      }
    } else {
      this.alignLines = undefined
    }
    
    try {
        return (
            <View 
                onLayout={(e) => {
                        e.persist()
                        InteractionManager.runAfterInteractions(() => {
                          this.callback(e)
                        })
                    }
                  }
              ref={component => this._root = component} {...rest}
              style={[this.props.style,
                      { 
                        flex: this.flex,
                        flexDirection: 'row',
                        alignContent: this.alignLines, 
                        flexWrap: this.wrapState,
                        alignItems: this.vAlign,
                        justifyContent: this.hAlign,
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