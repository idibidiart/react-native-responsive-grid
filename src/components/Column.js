
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
        this.state = {_id: +new Date() * Math.random()}
    }

    setNativeProps = (nativeProps) => {
      this._root.setNativeProps(nativeProps);
    }

    componentWillUnmount() {
      cancelAnimationFrame(this.props.parentAnimationFrame)
    }

    static propTypes = {
      sm: PropTypes.number,
      smOffset: PropTypes.number,
      smHidden: PropTypes.bool,
      md: PropTypes.number,
      mdOffset: PropTypes.number,
      mdHidden: PropTypes.bool,
      lg: PropTypes.number,
      lgOffset: PropTypes.number,
      lgHidden: PropTypes.bool,
      size: PropTypes.number,
      offset: PropTypes.number,
      vAlign: PropTypes.string,
      hAlign: PropTypes.string,
      fullWidth: PropTypes.bool,
      aspectRatio: PropTypes.object 
    }

    // top/flex-start is default
    align_Y = (this.props.vAlign === 'middle' ? 'center' : (this.props.vAlign === 'bottom' ? 'flex-end' : (this.props.vAlign === 'space' ? 'space-between' : (this.props.vAlign === 'distribute' ? 'space-around' : 'flex-start'))))
    // left/flex-start is default
    align_X = this.props.hAlign == 'stretch' ? 'stretch' : this.props.hAlign === 'center' ? 'center' : (this.props.hAlign === 'right' ? 'flex-end' : 'flex-start')

    render() {

      const {
        size,
        offset,
        sm,
        smOffset,
        smHidden,
        md,
        mdOffset,
        mdHidden,
        lg,
        lgOffset,
        lgHidden,
        vAlign,
        hAlign,
        rtl,
        fullWidth,
        aspectRatio,
        ...rest
      } = this.props;

      const screenInfo = ScreenInfo()

      const flex =  this.props.style && this.props.style.flex !== undefined ? 
                  this.props.style.flex : undefined

      const width = this.props.fullWidth ? '100%' : 
                (this.props.style && this.props.style.width !== undefined ? 
                  this.props.style.width : undefined)

      const minWidth =  this.props.style && this.props.style.minWidth !== undefined ? 
                  this.props.style.minWidth : undefined

      const style = {
                    flex: this.props.breakPoints &&  
                            this.props.breakPoints[screenInfo.mediaSize] !== undefined ? 
                              -1 : flex,
                    width: this.props.size || this.props[screenInfo.mediaSize + 'Size'] !== undefined ?
                              getColumnWidth(screenInfo.mediaSize, this.props) : 
                              width,
                    minWidth: this.props.breakPoints && 
                                this.props.breakPoints[screenInfo.mediaSize] !== undefined ? 
                                  this.props.breakPoints[screenInfo.mediaSize] : minWidth,
                    flexDirection: 'column',
                    marginLeft: this.props.rtl ? 0 : getColumnOffset(screenInfo.mediaSize, this.props),
                    marginRight: this.props.rtl ? getColumnOffset(screenInfo.mediaSize, this.props) : 0,
                    alignItems: this.align_X,
                    justifyContent: this.align_Y,
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


