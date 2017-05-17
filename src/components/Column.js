
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {ScreenInfo} from '../lib/ScreenInfo';
import {isHidden, isExcludedByAspectRatio, getColumnWidth, getColumnOffset} from '../lib/helpers';
import {View} from 'react-native';

const validateElements = (props) => {
    return React.Children.map(props.children, (element) => {
      if (!element) return null
      if (element.type && element.type.name === 'Column') {
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
      smSize: PropTypes.number,
      smOffset: PropTypes.number,
      smHidden: PropTypes.bool,
      mdSize: PropTypes.number,
      mdOffset: PropTypes.number,
      mdHidden: PropTypes.bool,
      lgSize: PropTypes.number,
      lgOffset: PropTypes.number,
      lgHidden: PropTypes.bool,
      xlSize: PropTypes.number,
      xlOffset: PropTypes.number,
      xlHidden: PropTypes.bool,
      size: PropTypes.number,
      offset: PropTypes.number,
      vAlign: PropTypes.string,
      hAlign: PropTypes.string,
      fullWidth: PropTypes.bool,
      fullHeight: PropTypes.bool,
      aspectRatio: PropTypes.object,
      breakPoints: PropTypes.object 
    }

    render() {

      const {
        size,
        offset,
        smSize,
        smOffset,
        smHidden,
        mdSize,
        mdOffset,
        mdHidden,
        lgSize,
        lgOffset,
        lgHidden,
        xlSize,
        xlOffset,
        xlHidden,
        vAlign,
        hAlign,
        rtl,
        fullWidth,
        fullHeight,
        aspectRatio,
        breakPoints,
        ...rest
      } = this.props;

      const screenInfo = ScreenInfo()

      this.flex =  this.props.style && this.props.style.flex !== undefined ? 
                  this.props.style.flex : 0

      this.width = fullWidth ? '100%' : 
                (this.props.style && this.props.style.width !== undefined ? 
                  this.props.style.width : undefined)
        
      this.height = fullHeight? '100%' : 
                (this.props.style && this.props.style.height !== undefined ? 
                  this.props.style.height : undefined)

      // top/flex-start is default
      this.alignY = vAlign === 'middle' ? 'center' : (vAlign === 'bottom' ? 'flex-end' : (vAlign === 'space' ? 'space-between' : (vAlign === 'distribute' ? 'space-around' : 'flex-start')))
      // left/flex-start is default
      this.alignX = hAlign === 'stretch' ? 'stretch' : hAlign === 'center' ? 'center' : (hAlign === 'right' ? 'flex-end' : 'flex-start')

      this.minWidth =  this.props.style && this.props.style.minWidth !== undefined ? 
                  this.props.style.minWidth : undefined

      const style = {
                    flex: breakPoints &&  
                            breakPoints[screenInfo.mediaSize] !== undefined ? 
                              -1 : this.flex,
                    width: size || this.props[screenInfo.mediaSize + 'Size'] !== undefined ?
                              getColumnWidth(screenInfo.mediaSize, this.props) : 
                              this.width,
                    height: this.height,
                    minWidth: breakPoints && 
                                breakPoints[screenInfo.mediaSize] !== undefined ? 
                                  breakPoints[screenInfo.mediaSize] : this.minWidth,
                    flexDirection: 'column',
                    marginLeft: rtl ? 0 : getColumnOffset(screenInfo.mediaSize, this.props),
                    marginRight: rtl ? getColumnOffset(screenInfo.mediaSize, this.props) : 0,
                    alignItems: this.alignX,
                    justifyContent: this.alignY,
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


