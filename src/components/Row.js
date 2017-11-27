import React from 'react';
import PropTypes from 'prop-types';
import {ScreenInfo} from '../lib/ScreenInfo';
import {View, InteractionManager} from 'react-native';
import {isHidden, isExcludedByAspectRatio, getSize, getOffset} from '../lib/helpers';

export default class Row extends React.Component {
  constructor(props) {
      super (props)
      this.state = {}
      this.hidden = false
      this.shown = true
      this.animFrame
  }

  componentWillUnmount = () => {
    cancelAnimationFrame(this.animFrame)
  }

  callback = () => {
    this.setState({layoutUpdated: +new Date()})
  }

  hide = () => {
    this.setState((state) => {
      this.hidden = true
      this.shown = false
      return {...state, display: 'none'}
    })
  }

  show = () => {
    this.setState((state) => {
      this.shown = true
      this.hidden = false
      return {...state, display: 'flex'}
    })
  }

  cloneElements = () => {
    const rtl = this.props.rtl 

    return React.Children.map((rtl ? React.Children.toArray(this.props.children).reverse() : this.props.children), (element) => {
      if (!element) return null
      if (element.type && (element.type.name === 'Row')) {
        if (__DEV__) 
          console.error("Row may not contain other Rows as children. Child rows must be wrapped in a Column.")
        return null
      } else if (element.type && element.type.name === 'Column') {
        if (isHidden(this.screenInfo.mediaSize, element.props) || 
            isExcludedByAspectRatio(element.props, this.screenInfo.aspectRatio)) {
          return null;
        } else {
          return React.cloneElement(element, {rtl})
        }
      } else {
        return element
      }
    })
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  static propTypes = {
    rtl: PropTypes.bool,
    noWrap: PropTypes.bool,
    hAlign: PropTypes.oneOf(['space', 'distribute', 'center', 'middle', 'left', 'right']),
    vAlign: PropTypes.oneOf(['stretch', 'middle', 'center', 'top', 'bottom', 'baseline']),
    alignSelf: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'middle', 'stretch']),
    fullHeight: PropTypes.bool,
    alignLines: PropTypes.string
  }

  render() {

    const {
      rtl,
      fullHeight,
      noWrap,
      hAlign,
      vAlign,
      alignLines,
      alignSelf,
      ...rest
    } = this.props

    this.screenInfo = ScreenInfo()

    this.wrapState = noWrap ? 'nowrap' : 'wrap'
    this.height =  (this.props.style && this.props.style.height !== undefined) ? this.props.style.height : fullHeight ? '100%' : undefined
    this.flex =  this.props.style && this.props.style.flex !== undefined ? this.props.style.flex : 0

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
        case 'middle':
          this.hAlign = 'center' 
          break; 
        case 'right': 
          this.hAlign = 'flex-end' 
          break;
        case 'left': 
          this.hAlign = 'flex-start'
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
      case 'center':
        this.vAlign = 'center' 
        break; 
      case 'bottom': 
        this.vAlign = 'flex-end' 
        break;
      case 'baseline':
        this.vAlign = 'baseline'
        break; 
      case 'top':
        this.vAlign = 'flex-start'
      default: 
        this.vAlign = 'flex-start'
    }

    switch (alignLines) {
      case 'top': 
        this.alignLines = 'flex-start' 
        break;
      case 'bottom':
        this.alignLines = 'flex-end' 
        break; 
      case 'middle': 
      case 'center':
        this.alignLines = 'center'  
        break;
      case 'space': 
        this.alignLines = 'space-between' 
        break;  
      case 'distribute': 
        this.alignLines = 'space-around'
        break;  
      case 'stretch': 
        this.alignLines = 'stretch'
        break;
      default: 
        this.alignLines = 'flex-start' 
    }

    switch (alignSelf) {
      case 'left': 
        this.alignSelf = 'flex-start' 
        break;
      case 'right':
        this.alignSelf = 'flex-end' 
        break; 
      case 'center': 
      case 'middle':
        this.alignSelf = 'center'  
        break;
      case 'stretch': 
        this.alignLines = 'stretch'
        break;
      default: 
        this.alignSelf = 'auto' 
    }
    
    return (
        <View {...rest}
          ref={component => this._root = component} 
          onLayout={(e) => {
            InteractionManager.runAfterInteractions(() => {
                this.animFrame = requestAnimationFrame(() => {
                  this.callback()
                })
            })
          }}
          style={[this.props.style,
            { 
              display: this.state.display || 'flex',
              flex: this.flex,
              flexDirection: 'row',
              height: this.height !== undefined ? this.height : 
                      (this.props.size !== undefined || 
                      this.props.sizePoints !== undefined ||
                      this.props[this.screenInfo.mediaSize + 'Size'] !== undefined ||
                      this.props[this.screenInfo.mediaSize + 'SizePoints'] !== undefined) ?
                          getSize(this.screenInfo.mediaSize, this.props) : undefined,
              alignContent: this.alignLines, 
              flexWrap: this.wrapState,
              alignItems: this.vAlign,
              justifyContent: this.hAlign,
              alignSelf: this.alignSelf,
              position: 'relative',
              overflow: 'hidden'
            }]}
          >
            {this.cloneElements()}
        </View>
    )
  
  }
}