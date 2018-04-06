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
    if (isHidden(this.screenInfo.mediaSizeHeight, this.props) ||
        isExcludedByAspectRatio(this.props, this.screenInfo.aspectRatio)) {
      return null;
    }

    const rtl = this.props.rtl
    return React.Children.map((rtl ? React.Children.toArray(this.props.children).reverse() : this.props.children), (element) => {
      if (!element) return null
      if (element.type && (element.type.name === 'Row')) {
        if (__DEV__)
          console.error("Row may not contain other Rows as children. Child rows must be wrapped in a Column.")
        return null
      } else if (element.type && element.type.name === 'Column') {
        return React.cloneElement(element, [{rtl}])
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
    alignLines: PropTypes.string,
    size: PropTypes.number,
    smSize: PropTypes.number,
    mdSize: PropTypes.number,
    lgSize: PropTypes.number,
    xlSize: PropTypes.number,
    sizePoints: PropTypes.number,
    smSizePoints: PropTypes.number,
    mdSizePoints: PropTypes.number,
    lgSizePoints: PropTypes.number,
    xlSizePoints: PropTypes.number,
    aspectRatio: PropTypes.object 
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
      size,
      smSize,
      mdSize,
      lgSize,
      xlSize,
      sizePoints,
      smSizePoints,
      mdSizePoints,
      lgSizePoints,
      xlSizePoints, 
      aspectRatio,
      ...rest
    } = this.props

    this.screenInfo = ScreenInfo()

    this.wrapState = noWrap ? 'nowrap' : 'wrap'
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
        this.vAlign = 'stretch'
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
        this.alignLines = 'stretch' 
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
          style={[this.props.style,
            { 
              display: this.state.display || 'flex',
              flex: this.flex,
              flexDirection: 'row',
              height: this.props.fullHeight ? '100%' : this.props.style && this.props.style.height !== undefined ? this.props.style.height : 
                      (this.props.size !== undefined || 
                      this.props.sizePoints !== undefined ||
                      this.props[this.screenInfo.mediaSizeHeight + 'Size'] !== undefined ||
                      this.props[this.screenInfo.mediaSizeHeight + 'SizePoints'] !== undefined) ?
                          getSize(this.screenInfo.mediaSizeHeight, this.props) : undefined,
              alignContent: this.alignLines, 
              flexWrap: this.wrapState,
              alignItems: this.vAlign,
              justifyContent: this.hAlign,
              alignSelf: this.alignSelf,
              position: this.props.style && this.props.style.position ? this.props.style.position : 'relative',
              overflow: 'hidden'
            }]}
          >
            {this.cloneElements()}
        </View>
    )
  
  }
}