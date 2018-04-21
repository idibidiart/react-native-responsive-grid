
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

let breakPoints = {
    SMALL_Width: 375,
    MEDIUM_Width: 767,
    LARGE_Width: 1023,
    // XLARGE_Width: 1024+
    SMALL_Height: 667,
    MEDIUM_Height: 1023,
    LARGE_Height: 1365,
    // XLARGE_Height: 1366+
};

const setBreakPoints = newBreakPoints => {
    breakPoints = {...breakPoints, ...newBreakPoints};
}

let _screenInfo = null,  _screenWidth = null, _screenHeight = null

const setScreenInfo = () => {
    const SCREEN_WIDTH = Dimensions.get('window').width
    const SCREEN_HEIGHT = Dimensions.get('window').height

    // no need to recompute everything if width/height haven't changed
    if ((_screenWidth === SCREEN_WIDTH) && (_screenHeight === SCREEN_HEIGHT)) {
        return _screenInfo;
    }
    _screenWidth = SCREEN_WIDTH;
    _screenHeight = SCREEN_HEIGHT;

    if (SCREEN_WIDTH <= breakPoints.SMALL_Width) {  // 0 to SMALL_Width
        mediaSizeWidth = 'sm';
    }
    else if (SCREEN_WIDTH <= breakPoints.MEDIUM_Width) { // SMALL_Width + 1 to MEDIUM_Width
        mediaSizeWidth = 'md';
    }
    else if (SCREEN_WIDTH <= breakPoints.LARGE_Width) { // MEDIUM_Width + 1 to LARGE_Width
        mediaSizeWidth = 'lg';
    }
    else { // > LARGE_Width (aka XLARGE_Width)
        mediaSizeWidth = 'xl';
    }

    if (SCREEN_HEIGHT <= breakPoints.SMALL_Height) { // 0 to SMALL_Height
        mediaSizeHeight = 'sm';
    }
    else if (SCREEN_HEIGHT <= breakPoints.MEDIUM_Height) { // SMALL_Height + 1 to LARGE_Height
        mediaSizeHeight =  'md';
    }
    else if (SCREEN_HEIGHT <= breakPoints.LARGE_Height) { // LARGE_Height + 1 to XLARGE_Height
        mediaSizeHeight = 'lg';
    }
    else { // > LARGE_Height (aka XLARGE_Height)
        mediaSizeHeight = 'xl';
    }

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

    _screenInfo = {
            mediaSize: mediaSizeWidth,
            mediaSizeWidth,
            mediaSizeHeight,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            aspectRatio: {currentNearestRatio, currentOrientation}
            }
    return _screenInfo
}

export {
  setScreenInfo as ScreenInfo,
  setBreakPoints
}
