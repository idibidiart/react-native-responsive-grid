## Universal, Responsive Pinterest Layout

```jsx
import React, { Component} from 'react'

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ImageBackground
} from 'react-native'

import { Row, Column as Col, ScreenInfo, Grid} from './grid'

// column width (relative to screen size)
const sizes = {sm: 100, md: 50, lg: 25, xl: 20}  

const layout = (state) => {

  const numCols = Math.floor(100/sizes[ScreenInfo().mediaSize])
  const numRows = Math.ceil(data.length / numCols)
  const colWidth = state.layout.grid ? state.layout.grid.width / numCols : 0
  
  let layoutMatrix = [], layoutCols = []

  for (let col = 0; col < numCols; col++) {
    layoutMatrix.push([])
    for (let row = 0, i = col; row < numRows; row++, i += numCols) {
      if (data[i]) 
        layoutMatrix[col].push(
          <Item 
                key={i}
                id={i} 
                url={data[i].url}
                height={data[i].pixelHeight}
                width={data[i].pixelWidth}
                margin={15}
                colWidth={colWidth}
                state={state} 
          />
        )
    }
    layoutCols.push(
        <Col
          key={col}
          smSize={state.layout.grid ? sizes.sm : 0 }
          mdSize={state.layout.grid ? sizes.md : 0 } 
          lgSize={state.layout.grid ? sizes.lg : 0 }
          xlSize={state.layout.grid ? sizes.xl : 0 } 
        >
        {layoutMatrix[col]}
        </Col>
      )
  }
  
  return layoutCols
}

const Item = (props) => {
  console.log(props)
  if (!props.colWidth)  return null

    return (
            <Row 
                style={{
                  backgroundColor: 'white',
                  margin: props.margin, borderRadius: 15, borderWidth: 1, borderColor: 'black'
                }}
                >
                <Col fullWidth> 
                  <ImageBackground 
                              source={{uri: props.url}}
                              style={{
                                width: props.colWidth,
                                height: props.height + ((props.colWidth - props.width) * props.height/props.width),
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                  
                  >
                  <Text style={{fontSize: 48, marginTop: 5}}>
                    {props.id}
                  </Text>
                  </ImageBackground>
                </Col>
            </Row>
        )}

export const Home = () => (
  <Grid>{({state, setState}) => (
        <Row fullHeight style={{backgroundColor: 'lightgray'}}> 
        <ScrollView removeClippedSubviews={true} >
            <Row >
              {layout(state)}
            </Row>
          </ScrollView>
        </Row>
      )}
  </Grid>)

const data = [
  {
    url: 'https://i.pinimg.com/236x/d8/3a/9b/d83a9b6faf2e58ff895342242bd62214.jpg',
    pixelHeight: 354,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/61/35/93/613593ea3d5537c7f85f7365f0d72f45.jpg',
    pixelHeight: 157,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/52/7c/66/527c66879c1bbbeaf53938e467ee8927.jpg',
    pixelHeight: 289,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/16/8e/1e/168e1e2ba9e74baf37e1c64df576b79c.jpg',
    pixelHeight: 326,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/22/0f/01/220f016c154044a51abca097f7ecc4ea.jpg',
    pixelHeight: 354,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/14/3a/8c/143a8c283ecaecbf90058ac0f914a1ed.jpg',
    pixelHeight: 176,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/3d/65/6f/3d656f63189290a84d906b92d0d1565d.jpg',
    pixelHeight: 571,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/7a/2c/f2/7a2cf28357e37a95dfac3d273ef9cb0a.jpg',
    pixelHeight: 265,
    pixelWidth: 190
  },
  {
    url: 'https://i.pinimg.com/236x/57/f2/c5/57f2c55991b7173ffa9056c413cae260.jpg',
    pixelHeight: 744,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/e0/d3/85/e0d385c22794dc2140639ffc73257047.jpg',
    pixelHeight: 354,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/b2/bf/d8/b2bfd8cb9ecb96982de45d96ef5f5801.jpg',
    pixelHeight: 249,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/c3/73/2a/c3732abb95e790432a0208097c4e662e.jpg',
    pixelHeight: 314,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/24/1b/5e/241b5eb929d7353e7a85c37cffad4027.jpg',
    pixelHeight: 188,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/8b/73/b9/8b73b932a9d73ae7e17f3ccc8fc4029c.jpg',
    pixelHeight: 156,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/88/a8/4d/88a84d09003aae699bde89d888428642.jpg',
    pixelHeight: 361,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/3c/ca/4f/3cca4f233f253b4ca72010f5200cb372.jpg',
    pixelHeight: 249,
    pixelWidth: 202
  },
  {
    url: 'https://i.pinimg.com/236x/35/50/b5/3550b5659e25022e8af69fb8f6417e13.jpg',
    pixelHeight: 1137,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/ba/2d/f9/ba2df9aa774329560f3ee48fc947a299.jpg',
    pixelHeight: 785,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/f0/45/4d/f0454d0a5047ba3c73a50cc8c9d80bba.jpg',
    pixelHeight: 353,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/d8/64/ca/d864cad4ec4d9cfb1a08202a887bb175.jpg',
    pixelHeight: 353,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/2d/f4/91/2df491590161974dc461767bd405de8e.jpg',
    pixelHeight: 405,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/c6/6d/02/c66d0236627dbb979f8b1c1b5cc3e8fb.jpg',
    pixelHeight: 354,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/bd/3c/35/bd3c35762f8174decf01096f980c10e0.jpg',
    pixelHeight: 236,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/90/0a/49/900a49c038c9759f79ddccbf6a82c499.jpg',
    pixelHeight: 480,
    pixelWidth: 230
  },
  {
    url: 'https://i.pinimg.com/236x/13/24/2f/13242f1e28dfe2e590859107d31758a1.jpg',
    pixelHeight: 300,
    pixelWidth: 225
  },
  {
    url: 'https://i.pinimg.com/236x/cc/da/2a/ccda2a351bb00a0267bb98e6bc8067eb.jpg',
    pixelHeight: 577,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/a7/1e/97/a71e9712083d908d31d55ada64598125.jpg',
    pixelHeight: 394,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/2d/cf/1e/2dcf1eca1f7329f45b4ecc572841b0f7.jpg',
    pixelHeight: 187,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/d5/32/b3/d532b398c2c824bace748d5c876e0d1f.jpg',
    pixelHeight: 975,
    pixelWidth: 236
  },
  {
    url: 'https://i.pinimg.com/236x/4f/a3/44/4fa3442fd9a7e2da25ddaddb968b6d0a.jpg',
    pixelHeight: 328,
    pixelWidth: 236
  }
]
```