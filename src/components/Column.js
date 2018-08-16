
import React from 'react';
import PropTypes from 'prop-types'
import {ScreenInfo} from '../lib/ScreenInfo';
import {isHidden, isExcludedByAspectRatio, getSize, getOffset} from '../lib/helpers';
import {View} from 'react-native';

export default class Column extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    setNativeProps = (nativeProps) => {
      this._root.setNativeProps(nativeProps);
    }

    hide = () => {
      this.setState((state) => {
        this.hidden = true
        return {...state, display: 'none'}
      })
    }
  
    show = () => {
      this.setState((state) => {
        this.shown = true
        return {...state, display: 'flex'}
      })
    }

    cloneElements = () => {
      if (isHidden(this.screenInfo.mediaSizeWidth, this.props) ||
          isExcludedByAspectRatio(this.props, this.screenInfo.aspectRatio)) {
        return null;
      }

      return React.Children.map(this.props.children, (element) => {
        if (!element) return null
        if (element.type && element.type.name === 'Column')  {
            if (__DEV__)
              console.error("Column may not contain other Columns as children. Child columns must be wrapped in a Row.")
            return null
        }
        return element
      })
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
      vAlign: PropTypes.oneOf(['space', 'distribute', 'middle', 'center', 'bottom', 'top']),
      hAlign: PropTypes.oneOf(['stretch', 'center', 'middle', 'right', 'left']),
      alignSelf: PropTypes.oneOf(['auto', 'top', 'bottom', 'middle', 'center', 'stretch', 'baseline']),
      fullWidth: PropTypes.bool,
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
        alignSelf,
        rtl,
        fullWidth,
        aspectRatio,
        ...rest
      } = this.props;

      this.screenInfo = ScreenInfo()

      this.flex =  this.props.style && this.props.style.flex !== undefined ? this.props.style.flex : 0

      switch (vAlign) {
        case 'space': 
          this.vAlign = 'space-between' 
          break;
        case 'distribute':
          this.vAlign = 'space-around'  
          break;
        case 'middle':
        case 'center': 
          this.vAlign = 'center' 
          break; 
        case 'bottom': 
          this.vAlign = 'flex-end' 
          break;
        default: 
          this.vAlign = 'flex-start'
      }

      if (rtl && !hAlign) {
        this.hAlign = 'flex-end'
      } else {
        switch (hAlign) {
          case 'stretch': 
            this.hAlign = 'stretch' 
            break;
          case 'center':
          case 'middle':
            this.hAlign = 'center' 
            break; 
          case 'left': 
            this.hAlign = 'flex-start' 
            break;
          case 'right': 
            this.hAlign = 'flex-end' 
            break;
          default: 
            this.hAlign = 'stretch'
        }
      }

      switch (alignSelf) {
        case 'stretch': 
          this.alignSelf = 'stretch' 
          break;
        case 'middle':
        case 'center':
          this.alignSelf = 'center' 
          break; 
        case 'top': 
          this.alignSelf = 'flex-start' 
          break;
        case 'bottom': 
          this.alignSelf = 'flex-end' 
          break;
        case 'baseline': 
          this.alignSelf = 'baseline' 
          break;
        default: 
          this.alignSelf = 'auto'
      }

      this.style = {
                    display: this.state.display || 'flex',
                    flex: this.flex,
                    width: this.props.fullWidth ? '100%' : this.props.style && this.props.style.width !== undefined ? this.props.style.width : 
                            (this.props.size !== undefined || 
                              this.props.sizePoints !== undefined ||
                              this.props[this.screenInfo.mediaSizeWidth + 'Size'] !== undefined ||
                              this.props[this.screenInfo.mediaSizeWidth + 'SizePoints'] !== undefined) ?
                                getSize(this.screenInfo.mediaSizeWidth, this.props) : undefined,
                    flexDirection: 'column',
                    marginLeft: this.props.style && this.props.style.marginLeft !== undefined ? this.props.style.marginLeft :
                                  !this.props.rtl && (
                                  this.props.offset !== undefined || 
                                  this.props.offsetPoints !== undefined ||
                                  this.props[this.screenInfo.mediaSizeWidth + 'Offset'] !== undefined ||
                                  this.props[this.screenInfo.mediaSizeWidth + 'OffsetPoints'] !== undefined) ? 
                                      getOffset(this.screenInfo.mediaSizeWidth, this.props) : undefined,
                    marginRight: this.props.style && this.props.style.marginRight !== undefined ? this.props.style.marginRight :
                                  this.props.rtl && (
                                  this.props.offset !== undefined || 
                                  this.props.offsetPoints !== undefined ||
                                  this.props[this.screenInfo.mediaSizeWidth + 'Offset'] !== undefined ||
                                  this.props[this.screenInfo.mediaSizeWidth + 'OffsetPoints'] !== undefined) ? 
                                      getOffset(this.screenInfo.mediaSizeWidth, this.props) : undefined,
                    alignItems: this.hAlign,
                    justifyContent: this.vAlign,
                    alignSelf: this.alignSelf,
                    position: this.props.style && this.props.style.position ? this.props.style.position : 'relative',
                    overflow: 'hidden'
                  }       

        try {
          return (
              <View {...rest}
                ref={component => this._root = component} 
                style={[this.props.style, this.style]}>
                    {this.cloneElements()}
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
