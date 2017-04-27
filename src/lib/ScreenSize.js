'use strict';

import React from 'react';
import { Dimensions } from 'react-native';

function setScreenSize(){
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SMALL = 480 
  const MEDIUM = 768 
  const LARGE = 1024
  const XLARGE = 1366

  if (SCREEN_WIDTH <= SMALL){
    return 'small';
  }

  if (SCREEN_WIDTH > SMALL  && SCREEN_WIDTH < LARGE){
    return  'medium';
  }
  if (SCREEN_WIDTH >= LARGE && SCREEN_WIDTH < XLARGE){
    return 'large';
  }
  if (SCREEN_WIDTH >= XLARGE){
    return 'xlarge';
  }

}

export const screenSize = setScreenSize
