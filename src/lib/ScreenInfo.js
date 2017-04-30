'use strict';

import React from 'react';
import { Dimensions } from 'react-native';

const setScreenInfo = () => {
  const SCREEN_WIDTH = Dimensions.get('window').width
  const SCREEN_HEIGHT = Dimensions.get('window').height
  const SMALL = 480 
  const MEDIUM = 768 
  const LARGE = 1024
  const XLARGE = 1366

  let mediaSize = 'small'
  let aspectRatio = {w: 1, h: 1.78}

  if (SCREEN_WIDTH <= SMALL){
    mediaSize = 'small';
  }

  if (SCREEN_WIDTH > SMALL  && SCREEN_WIDTH < LARGE){
    mediaSize =  'medium';
  }
  if (SCREEN_WIDTH >= LARGE && SCREEN_WIDTH < XLARGE){
    mediaSize = 'large';
  }
  if (SCREEN_WIDTH >= XLARGE){
    mediaSize = 'xlarge';
  }

  aspectRatio = (SCREEN_WIDTH > SCREEN_HEIGHT ? 
                  {w: (SCREEN_WIDTH/SCREEN_HEIGHT).toFixed(2), h: "1"} :
                  (SCREEN_WIDTH === SCREEN_HEIGHT ? {w: "1", h: "1"} :
                    {w: "1", h: (SCREEN_HEIGHT/SCREEN_WIDTH).toFixed(2)}
                  ))
  return {mediaSize, aspectRatio}
}

export const ScreenInfo = setScreenInfo 