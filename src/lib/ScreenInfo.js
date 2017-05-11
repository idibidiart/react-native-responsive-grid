
'use strict';

import React from 'react';
import { Dimensions } from 'react-native';

const closest = (elem, array) => {
    var minDelta = null;
    var minIndex = null;
    for (var i = 0 ; i<array.length; i++){
        var delta = Math.abs(array[i]-elem);
        if (minDelta == null || delta < minDelta){
            minDelta = delta;
            minIndex = i;
        }
        else {
            return {value: array[i-1], index: i-1}
        }

    }
    return {value: array[minIndex], index: minIndex}
}

const setScreenInfo = (onlySize) => {
  const SCREEN_WIDTH = Dimensions.get('window').width
  const SCREEN_HEIGHT = Dimensions.get('window').height
  const SMALL = 480 
  const MEDIUM = 768 
  const LARGE = 1024
  const XLARGE = 1366

  let mediaSize;

  if (SCREEN_WIDTH <= SMALL){
    mediaSize = 'sm'
  }

  if (SCREEN_WIDTH > SMALL  && SCREEN_WIDTH < LARGE){
    mediaSize =  'md'
  }
  if (SCREEN_WIDTH >= LARGE && SCREEN_WIDTH < XLARGE){
    mediaSize = 'lg'
  }
  if (SCREEN_WIDTH >= XLARGE){
    mediaSize = 'xl'
  }
  
  if (!onlySize) {
    const aspectRatios = ['16:9', '16:10', '3:2', '4:3', '1:1','4:3', '3:2', '16:10', '16:9'];
    const decimalRatios = [1.77, 1.6, 1.5, 1.33, 1, 0.75, 0.66, 0.625, 0.56];
    const currentFloatRatio= SCREEN_WIDTH/SCREEN_HEIGHT;
    const currentDecimalRatio = closest(currentFloatRatio, decimalRatios)
    const currentNearestRatio = aspectRatios[currentDecimalRatio.index];
    
    let currentOrientation;

    if (currentDecimalRatio.value == 1) {
        currentOrientation = "square"
    } else if (currentDecimalRatio.value > 1) {
        currentOrientation = "landscape"
    } else {
        currentOrientation = "portrait"
    }

    return {
            mediaSize, 
            width: SCREEN_WIDTH, 
            height: SCREEN_HEIGHT, 
            aspectRatio: {currentNearestRatio, currentOrientation}
          }
  } else {
    return {
            mediaSize,
            width: SCREEN_WIDTH, 
            height: SCREEN_HEIGHT 
        }
  }
}

export const ScreenInfo = setScreenInfo 