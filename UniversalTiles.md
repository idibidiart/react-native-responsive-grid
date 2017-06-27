## Universal Tiles

This examples showcases the grid's 'adaptive' behavior. The problem it solves is summarized below:

How to make a tiled screen layout that is highly usable and looks consistent across all screen sizes and aspect ratios, and how to do that using this grid (react-native-responsive-grid.) This involves the following:

1. How to size tiles such that they change size relative to the size of the screen *as well as* retain their shape (width/height aspect ratio)

2. How do we hide/show tiles on demand and fill the void left by hidden tiles using Flexbox wrapping behavior 

The goal is how to do the above in an elegant and declarative way that allows the average user to work without all the tedious implementation details of doing it in row Flexbox and JS. 

Below is the first stab at this... Suggestions are welcome.


```js
import React, { Component} from 'react'

import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    ScrollView,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native'

import { Row, Column as Col} from './grid'

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Login from './Login'

export default class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.hidden = {}
  }

  // todo: migrate ExNavigation to React Navigation
  static route = {
      navigationBar: {
        title: 'Home',
        renderTitle: (route, props) => {
          return (
          <Row fullHeight vAlign='middle' >
            <Col fullWidth hAlign='center'>
              <Text style={{fontSize: 22}}>Universal Tiles</Text>
            </Col>
          </Row>)
        },
        backgroundColor: "#fff"
      }
    }

  _subOpenModal

  _subLayout

  componentWillMount() {
    this._subOpenModal = this.props.route.getEventEmitter().addListener('openModal', this._handleOpenModal);
    this._subLayout = DeviceEventEmitter.addListener("updateLayout", (e) => {
        this.setState({layoutInfo: e})
      })
  }

  componentWillUnmount() {
    this._subOpenModal.remove();
    this._subLayout.remove()
  }

  _handleOpenModal = () => {
    this.login.open()
  }

  hide = (id) => {
    this.hidden[id].hide()
  }

  showAll = (e) => {
    Object.keys(this.hidden).forEach((id) => {
      this.hidden[id].show()
    })
  }

  render() {

    return (
      <Row fullHeight layoutEvent="updateLayout" style={{backgroundColor: 'lightgray'}}> 
       <ScrollView removeClippedSubviews={true} >
         <TouchableOpacity activeOpacity={1} onPress={(e) => this.showAll(e)} underlayColor='transparent'>
          <Row>
            <Col ref={(col) => this.hidden['some_id_1'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'yellow'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_1')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_2'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'orange'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_2')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_3'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'pink'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_3')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_4'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'red'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0}  
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_4')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_5'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'lightgreen'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0}  
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_5')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_6'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'purple'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_6')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_7'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'lightsalmon'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0}  
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_7')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_8'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'magenta'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_8')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_9'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'lavender'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0}  
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_9')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_10'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'lightseagreen'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0}  
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_10')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_11'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'chartreuse'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0}  
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_11')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_12'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} style={{backgroundColor: 'gold'}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0}  
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}>
                  <Col> 
                    <Row fullHeight rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_12')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    
                  </Col>
              </Row>
            </Col>
            
          </Row>
          </TouchableOpacity>
        </ScrollView>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  titleImage: {
    width: 120,
    height: 24,
    resizeMode: 'stretch' 
  }
})
```