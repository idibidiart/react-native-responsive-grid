
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

let mediaSizeWidth, mediaSizeHeight;

const setScreenInfo = (onlySize) => {
  const SCREEN_WIDTH = Dimensions.get('window').width
  const SCREEN_HEIGHT = Dimensions.get('window').height

  const SMALL_Width = 375 
  const MEDIUM_Width = 414 
  const LARGE_Width = 768
  const XLARGE_Width = 1024 

  const SMALL_Height = 667
  const MEDIUM_Height = 736
  const LARGE_Height = 1024 
  const XLARGE_Height = 1366 
 
    if (SCREEN_WIDTH <= SMALL_Width){
        mediaSizeWidth = 'sm'
    }
    if (SCREEN_WIDTH > SMALL_Width  && SCREEN_WIDTH < LARGE_Width){
        mediaSizeWidth =  'md'
    }
    if (SCREEN_WIDTH >= LARGE_Width && SCREEN_WIDTH < XLARGE_Width){
        mediaSizeWidth = 'lg'
    }
    if (SCREEN_WIDTH >= XLARGE_Width){
        mediaSizeWidth = 'xl'
    }
    if (SCREEN_HEIGHT <= SMALL_Height){
        mediaSizeHeight = 'sm'
    }
    if (SCREEN_HEIGHT > SMALL_Height  && SCREEN_HEIGHT < LARGE_Height){
        mediaSizeHeight =  'md'
    }
    if (SCREEN_HEIGHT >= LARGE_Height && SCREEN_HEIGHT < XLARGE_Height){
        mediaSizeHeight = 'lg'
    }
    if (SCREEN_HEIGHT >= XLARGE_Height){
        mediaSizeHeight = 'xl'
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
            mediaSize: mediaSizeWidth,
            mediaSizeWidth,
            mediaSizeHeight, 
            width: SCREEN_WIDTH, 
            height: SCREEN_HEIGHT, 
            aspectRatio: {currentNearestRatio, currentOrientation}
          }
  } else {
    return {
            mediaSize: mediaSizeWidth,
            mediaSizeWidth,
            mediaSizeHeight, 
            width: SCREEN_WIDTH, 
            height: SCREEN_HEIGHT 
        }
  }
}

export const ScreenInfo = setScreenInfo 