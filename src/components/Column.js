
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {ScreenInfo} from '../lib/ScreenInfo';
import {isHidden, isExcludedByAspectRatio, getColumnWidth, getColumnOffset} from '../lib/helpers';
import {View} from 'react-native';

const validateElements = (props) => {
    return React.Children.map(props.children, (element) => {
      if (!element) return null
      if (element.type && (element.type.name === 'Column' || (element.props.style && element.props.style.flexDirection === 'column')))  {
          throw new Error("Column may not contain other Columns as children. Child Columns must be wrapped in a Row.")
      }
      return element
    })
}

export default class Column extends React.Component {
    constructor (props) {
        super(props)
    }

    setNativeProps = (nativeProps) => {
      this._root.setNativeProps(nativeProps);
    }

    static propTypes = {
      size: PropTypes.number,
      sizePoints: PropTypes.number,
      offset: PropTypes.number,
      offsetPoints: PropTypes.number,
      smSize: PropTypes.number,
      smSizePoints: PropTypes.number,
      smOffset: PropTypes.number,
      smOffsetPoints: PropTypes.number,
      smHidden: PropTypes.bool,
      mdSize: PropTypes.number,
      mdSizePoints: PropTypes.number,
      mdOffset: PropTypes.number,
      mdOffsetPoints: PropTypes.number,
      mdHidden: PropTypes.bool,
      lgSize: PropTypes.number,
      lgSizePoints: PropTypes.number,
      lgOffset: PropTypes.number,
      lgOffsetPoints: PropTypes.number,
      lgHidden: PropTypes.bool,
      xlSize: PropTypes.number,
      xlSizePoints: PropTypes.number,
      xlOffset: PropTypes.number,
      xlOffsetPoints: PropTypes.number,
      xlHidden: PropTypes.bool,
      vAlign: PropTypes.string,
      hAlign: PropTypes.string,
      fullWidth: PropTypes.bool,
      fullHeight: PropTypes.bool,
      aspectRatio: PropTypes.object 
    }

    render() {
      const {
        size,
        sizePoints,
        offset,
        offsetPoints,
        smSize,
        smSizePoints,
        smOffset,
        smOffsetPoints,
        smHidden,
        mdSize,
        mdSizePoints,        
        mdOffset,
        mdOffsetPoints,
        mdHidden,
        lgSize,
        lgSizePoints,
        lgOffset,
        lgOffsetPoints,
        lgHidden,
        xlSize,
        xlSizePoints,
        xlOffset,
        xlOffsetPoints,
        xlHidden,
        vAlign,
        hAlign,
        rtl,
        fullWidth,
        fullHeight,
        aspectRatio,
        ...rest
      } = this.props;

      const screenInfo = ScreenInfo()

      this.flex =  (this.props.style && this.props.style.flex !== undefined) ? this.props.style.flex : 0
      this.width = (this.props.style && this.props.style.width !== undefined) ? this.props.style.width : undefined
      this.height = (this.props.style && this.props.style.height !== undefined) ? this.props.style.height : undefined
      this.minWidth =  (this.props.style && this.props.style.minWidth !== undefined) ? this.props.style.minWidth : undefined
      this.minHeight =  (this.props.style && this.props.style.minHeight !== undefined) ? this.props.style.minHeight : undefined
      this.marginLeft =  (this.props.style && this.props.style.marginLeft !== undefined) ? this.props.style.marginLeft : undefined
      this.marginRight =  (this.props.style && this.props.style.marginRight !== undefined) ? this.props.style.marginRight : undefined

      switch (vAlign) {
        case 'space': 
          this.vAlign = 'space-between' 
          break;
        case 'distribute':
          this.vAlign = 'space-around'  
          break;
        case 'middle': 
          this.vAlign = 'center' 
          break; 
        case 'bottom': 
          this.vAlign = 'flex-end' 
          break;
        default: 
          this.vAlign = 'flex-start'
      }

      switch (hAlign) {
        case 'stretch': 
          this.hAlign = 'stretch' 
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

      const style = {
                    flex: (this.minWidth !== undefined || this.minHeight !== undefined) ? 
                              -1 : this.flex,
                    width: this.props.fullWidth ? '100%' : 
                            (this.props.size !== undefined || 
                              this.props.sizePoints ||
                              this.props[screenInfo.mediaSize + 'Size'] !== undefined ||
                              this.props[screenInfo.mediaSize + 'SizePoints'] !== undefined) ?
                                getColumnWidth(screenInfo.mediaSize, this.props) : 
                                  this.width,
                    height: this.props.fullHeight ? '100%' : this.height,
                    flexDirection: 'column',
                    marginLeft: !this.props.rtl && (this.props.offset !== undefined || 
                                  this.props.offsetPoints ||
                                  this.props[screenInfo.mediaSize + 'Offset'] !== undefined ||
                                  this.props[screenInfo.mediaSize + 'OffsetPoints'] !== undefined) ? 
                                    getColumnOffset(screenInfo.mediaSize, this.props) : this.marginLeft,
                    marginRight: this.props.rtl && (this.props.offset !== undefined || 
                                  this.props.offsetPoints ||
                                  this.props[screenInfo.mediaSize + 'Offset'] !== undefined ||
                                  this.props[screenInfo.mediaSize + 'OffsetPoints'] !== undefined) ? 
                                    getColumnOffset(screenInfo.mediaSize, this.props) : this.marginRight,
                    alignItems: this.hAlign,
                    justifyContent: this.vAlign,
                    position: 'relative'
                  }

      if (isHidden(screenInfo.mediaSize, this.props) || 
          isExcludedByAspectRatio(this.props, screenInfo.aspectRatio)){
        return null;
      } else {
        try {
          return (
              <View 
                ref={component => this._root = component} {...rest}
                style={[this.props.style, style]}>
                    {validateElements(rest)}
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
}