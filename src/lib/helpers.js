'use strict';

import { Dimensions } from 'react-native';

const isHidden = (screenSize, props) => {

  switch(screenSize) {
    case 'sm':
      return props.smHidden ? true : false;
    case 'md':
      return props.mdHidden ? true : false;
    case 'lg':
      return props.lgHidden ? true : false;
    case 'xl':
      return props.xlHidden ? true : false;
    default:
      return false;
  }
}

const isExcludedByAspectRatio = ({aspectRatio},  {currentNearestRatio, currentOrientation}) => {
  if (aspectRatio !== undefined) {
    if (aspectRatio.ratio !== currentNearestRatio || aspectRatio.orientation.toLowerCase() !== currentOrientation) {
      return true
    }
  }
  return false
}

const toPercent = (num) => num + '%';

const getColumnWidth = (screenSize, props) => {

  switch(screenSize) {
    case 'sm':
      if (props.smSize) {
        return toPercent(Math.max(props.smSize, 0));
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
      }

    case 'md':
      if (props.mdSize) {
        return toPercent(Math.max(props.mdSize, 0));
      } else if (props.size !== undefined)  {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
      }

    case 'lg':
      if (props.lgSize) {
        return toPercent(Math.max(props.lgSize, 0));
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
      }

    case 'xl':
      if (props.xlSize) {
        return toPercent(Math.max(props.xlSize, 0));
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
      }
  
    default:
      if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
      }
  }
}

const getColumnOffset = (screenSize, props) => {

  switch(screenSize) {
    case 'small':
      if (props.smOffset) {
        return toPercent(props.smOffset)
      } else if (props.offset) {
        return toPercent(props.offset)
      } else {
        return 0;
      }

    case 'medium':
      if (props.mdOffset) {
        return toPercent(props.mdOffset)
      } else if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0;
      }

    case 'large':
      if (props.lgOffset) {
        return toPercent(props.lgOffset);
      } else if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0;
      }

    case 'xlarge':
      if (props.xlOffset) {
        return toPercent(props.xlOffset);
      } else if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0;
      }

    default:
      if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0
      }
  }
};

module.exports = {isHidden, isExcludedByAspectRatio, getColumnWidth, getColumnOffset}