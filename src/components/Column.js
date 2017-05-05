
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {ScreenInfo} from '../lib/ScreenInfo';
import {isHidden, isExcludedByAspectRatio, getColumnWidth, getColumnOffset} from '../lib/helpers';
import {View, DeviceEventEmitter} from 'react-native';

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
        eventKey,
        ...rest
      } = this.props;

      const screenInfo = ScreenInfo()

      if (isHidden(screenInfo.mediaSize, this.props) || 
          isExcludedByAspectRatio(screenInfo.aspectRatio, this.props)){
        return null;
      } else {
        try {
          return (
              <View 
                onLayout={(e)=> {
                       DeviceEventEmitter.emit('layout_change_' + this.props.eventKey)
                  }
                }
                ref={component => this._root = component} {...rest}
                style={[
                  this.props.style, {
                    width: (this.props.style && this.props.style.width !== undefined) ? 
                            this.props.style.width : 
                            (this.props.fullWidth ? '100%' : getColumnWidth(screenInfo.mediaSize, this.props)),
                    flexDirection: 'column',
                    marginLeft: this.props.rtl ? 0 : getColumnOffset(screenInfo.mediaSize, this.props),
                    marginRight: this.props.rtl ? getColumnOffset(screenInfo.mediaSize, this.props) : 0,
                    alignItems: this.align_X,
                    justifyContent: this.align_Y
                  }]}>
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


