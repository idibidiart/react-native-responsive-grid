'use strict';

import { Dimensions } from 'react-native';

export const isHidden = (screenSize, props) => {
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

export const isExcludedByAspectRatio = ({aspectRatio},  {currentNearestRatio, currentOrientation}) => {
  if (aspectRatio !== undefined) {
    if (aspectRatio.ratio !== currentNearestRatio || aspectRatio.orientation.toLowerCase() !== currentOrientation) {
      return true
    }
  }
  return false
}

const toPercent = (num) => num + '%';

export const getSize = (screenSize, props) => {

  switch(screenSize) {
    case 'sm':
      if (props.smSize !== undefined || props.smSizePoints !== undefined) {
        if (props.smSize !== undefined)
          return toPercent(Math.max(props.smSize, 0));
        return props.smSizePoints
      } else if (props.size !== undefined || props.sizePoints !== undefined) {
        if (props.size !== undefined)
          return toPercent(Math.max(props.size, 0));
        return props.sizePoints
      } else {
        return undefined
      }

    case 'md':
      if (props.mdSize !== undefined || props.mdSizePoints) {
        if (props.mdSize !== undefined)
          return toPercent(Math.max(props.mdSize, 0));
        return props.mdSizePoints
      } else if (props.size !== undefined || props.sizePoints !== undefined) {
        if (props.size !== undefined)
          return toPercent(Math.max(props.size, 0));
        return props.sizePoints
      } else {
        return undefined
      }

    case 'lg':
      if (props.lgSize !== undefined || props.lgSizePoints !== undefined) {
        if (props.lgSize !== undefined)
          return toPercent(Math.max(props.lgSize, 0));
        return props.lgSizePoints
      } else if (props.size !== undefined || props.sizePoints !== undefined) {
        if (props.size !== undefined)
          return toPercent(Math.max(props.size, 0));
        return props.sizePoints
      } else {
        return undefined
      }

    case 'xl':
      if (props.xlSize !== undefined || props.xlSizePoints !== undefined) {
        if (props.xlSize !== undefined)
          return toPercent(Math.max(props.xlSize, 0));
        return props.xlSizePoints
      } else if (props.size !== undefined || props.sizePoints !== undefined) {
        if (props.size !== undefined)
          return toPercent(Math.max(props.size, 0));
        return props.sizePoints
      } else {
        return undefined
      }
  }
}

export const getOffset = (screenSize, props) => {

  switch(screenSize) {
    case 'sm':
      if (props.smOffset !== undefined || props.smOffsetPoints) {
        if (props.smOffset !== undefined)
          return toPercent(props.smOffset)
        return props.smOffsetPoints
      } else if (props.offset !== undefined || props.offsetPoints !== undefined) {
        if (props.offset !== undefined)
          return toPercent(props.offset)
        return props.offsetPoints
      } else {
        return undefined;
      }

    case 'md':
      if (props.mdOffset !== undefined || props.mdOffsetPoints !== undefined) {
        if (props.mdOffset !== undefined)
          return toPercent(props.mdOffset)
        return props.mdOffsetPoints
       } else if (props.offset !== undefined || props.offsetPoints !== undefined) {
        if (props.offset !== undefined)
          return toPercent(props.offset)
        return props.offsetPoints
      } else {
        return undefined;
      }

    case 'lg':
      if (props.lgOffset !== undefined || props.lgOffsetPoints !== undefined) {
        if (props.lgOffset !== undefined)
          return toPercent(props.lgOffset);
        return props.lgOffsetPoints
      } else if (props.offset !== undefined || props.offsetPoints !== undefined) {
        if (props.offset !== undefined)
          return toPercent(props.offset)
        return props.offsetPoints
      } else {
        return undefined;
      }

    case 'xl':
      if (props.xlOffset !== undefined || props.xlOffsetPoints !== undefined) {
        if (props.xlOffset !== undefined)
          return toPercent(props.xlOffset);
        return props.xlOffsetPoints
      } else if (props.offset !== undefined || props.offsetPoints !== undefined) {
        if (props.offset !== undefined)
          return toPercent(props.offset)
        return props.offsetPoints
      } else {
        return undefined;
      }
  }
};
