
'use strict';

import React from 'react';
import { Dimensions } from 'react-native';

const diff = (value, list, index) => Math.abs(value - list[index])
    
// binary search in case we wish to let user specify a wide range of aspect ratios for
// the web/desktop version
const closest = (value, list) => {
    let start = 0;
    let end = list.length - 1
    let mid = (end + start) >> 1
    while (start < end && list[mid] !== value) {
        if (value < list[mid]) {
            end = mid - 1
        } else if (value > list[mid]) {
            start = mid + 1
        }
        mid = (end + start) >> 1
    }

    let resultIndex

    if (list[mid] === value) {
        resultIndex = mid;
    } else {
        const prev = mid - 1;
        const next = mid + 1;

        if (prev < 0) {
            resultIndex = diff(value, list, mid) < diff(value, list, next) ? mid : next
        } else if (next >= list.length) {
            resultIndex = diff(value, list, prev) < diff(value, list, mid) ? prev : mid
        } else {
            if (diff(value, list, prev) < diff(value, list, mid)) {
                resultIndex = diff(value, list, prev) < diff(value, list, next) ? prev : next
            } else {
                resultIndex = diff(value, list, mid) < diff(value, list, next) ? mid : next
            }
        }
    }

    return {index: resultIndex, value: list[resultIndex]}
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
    // sorted ascending order
    const decimalRatios = [0.56, 0.625, 0.66, 0.75, 1, 1.33, 1.5, 1.6, 1.77];
    // values in aspetcRatios array must map 1:1 order-wise to values in decimalRatios array
    const aspectRatios = ['16:9', '16:10', '3:2', '4:3', '1:1','4:3', '3:2', '16:10', '16:9'];
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