import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden} from '../lib/helpers';
import {View} from 'react-native';

const cloneElements = (props) => {
    //if size doesn't exist or is 0 default to "12 columns"" ratio
    const colPercent = props.colPercent > 0 ? Math.min(props.colPercent, 100) : 8.33333333;

    const rtl = props.rtl 

    return React.Children.map(props.children, (element) => {
      return React.cloneElement(element, {colPercent: colPercent, rtl: rtl});
    });
}

const Row = (props) => {
  if(isHidden(screenSize, props)){
      return null;
    } else {
      return (
        <View {...props}
          style={[props.style,
                  { flexDirection: 'row',
                    flexWrap: props.nowrap ? 'nowrap' : 'wrap',
                    alignItems: (props.alignVertical === 'top' ? 'flex-start' : (props.alignVertical === 'bottom' ? 'flex-end' : (props.alignVertical === 'fill' ? 'stretch' : 'center'))),
                    justifyContent: props.rtl ? 'flex-end' : 'flex-start'
                  }]}>
            {cloneElements(props)}
        </View>
      );
    }
}

Row.propTypes = {
  size: PropTypes.number,
  nowrap: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,
};

export default Row;