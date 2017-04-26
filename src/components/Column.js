import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden, getColumnWidth, getColumnOffset} from '../lib/helpers';
import {View, DeviceEventEmitter, InteractionManager} from 'react-native';

const cloneElements = (props) => {
    return React.Children.map(props.children, (element) => {
      if (!element) return null
      if (element.type.name === 'Column') {
          throw new Error("Column may not contain other Columns as children. Child Columns must be wrapped in a Row.")
      }
      return element
    })
}

export default class Column extends React.Component {

    constructor (props) {
        super(props)
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
      full: PropTypes.bool
    }

    setNativeProps = (nativeProps) => {
      this._root.setNativeProps(nativeProps);
    }

     // top/flex-start is default
     align_Y = (this.props.vAlign === 'middle' ? 'center' : (this.props.vAlign === 'bottom' ? 'flex-end' : (this.props.vAlign === 'space' ? 'space-between' : (this.props.vAlign === 'distribute' ? 'space-around' : 'flex-start'))))
    // left/flex-start is default
     align_X = ((this.props.hAlign === 'stretch' || (this.props.full && !this.props.hAlign)) ? 'stretch' : (this.props.hAlign === 'center' ? 'center' : ((this.props.hAlign === 'right' || (this.props.rtl && this.props.hAlign !== 'left')) ? 'flex-end' : 'flex-start')))

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
        full,
        ...rest
      } = this.props;

      const mediaSize = screenSize()

      if (isHidden(mediaSize, this.props)){
        return null;
      } else {
        
        try {
          return (
              <View 
                ref={component => this._root = component} {...rest}
                style={[
                  this.props.style, {
                    width: (this.props.style && this.props.style.width !== undefined) ? 
                            this.props.style.width : 
                            getColumnWidth(mediaSize, this.props),
                    flexDirection: 'column',
                    marginLeft: this.props.rtl ? 0 : getColumnOffset(mediaSize, this.props),
                    marginRight: this.props.rtl ? getColumnOffset(mediaSize, this.props) : 0,
                    alignItems: this.align_X,
                    justifyContent: this.align_Y
                  }]}>
                    {cloneElements(rest)}
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


