import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden} from '../lib/helpers';
import {View} from 'react-native';

const cloneElements = (props) => {
    //if size doesn't exist or is 0 default to 12
    const rowSize = props.size > 0 ? props.size : 12;

    return React.Children.map(props.children, (element) => {
      return React.cloneElement(element, {rowSize: rowSize});
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
                    alignItems: props.alignItems,
                    justifyContent: props.justifyContent
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