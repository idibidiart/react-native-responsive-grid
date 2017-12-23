## Universal Tiles

```jsx
import React, { Component} from 'react'

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import { Row, Column as Col, Grid} from './grid'

const data = [...new Array(12).keys()]

// column width (relative to screen size)
const sizes = {sm: 100, md: 50, lg: 33.333, xl: 25}  

let els = {}

const hide = (id) => {
    els[id].hide()
}

const showAll = (e) => {
    Object.keys(els).forEach((id) => {
      els[id].show()
    })
}

const Item = (props) => {
     return (
              <Col ref={(col) => props.els[props.id] = col} smSize={sizes.sm} mdSize={sizes.md} lgSize={sizes.lg} xlSize={sizes.xl} 
              style={{backgroundColor: colors[props.id]}}>
              <Row 
                  smSizePoints={props.state.layout.grid ? props.state.layout.grid.height / 2 : 0} 
                  mdSizePoints={props.state.layout.grid ? props.state.layout.grid.width / 2 : 0} 
                  lgSizePoints={props.state.layout.grid ? props.state.layout.grid.width / 3 : 0} 
                  xlSizePoints={props.state.layout.grid ? props.state.layout.grid.width / 4 : 0}
                  alignLines="stretch">
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { props.hide(props.id)}}>
                          <Text style={{fontSize: 22, marginTop: 15}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      {props.id}
                    </Text>
                  </Col>
              </Row>
            </Col>)}

const layout = (state) => {
    return  data.map((i) => {
        return ([<Item 
            key={i}
            id={i} 
            els={els}
            hide={hide}
            state={state}
        />])
    })
}

export const Home = () =>(
        <Grid>{({state, setState}) => {
            console.log(state)
            return (
            <Col fullHeight style={{backgroundColor: 'lightgray'}}> 
                <ScrollView removeClippedSubviews={true} >
                    <TouchableOpacity activeOpacity={1} onPress={(e) => showAll(e)}>
                    <Row>
                        {
                            layout(state)
                        }
                    </Row>
                    </TouchableOpacity>
            </ScrollView>
            </Col>)}
        }
        </Grid>
    )

const colors = ['lightyellow', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'pink',
                'orange', 'yellow', 'lime', 'lightgreen', 'purple', 'magenta', 'gold']
```