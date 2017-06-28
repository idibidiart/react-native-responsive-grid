## Universal Tiles

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

export default class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.hidden = {}
  }

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
         <TouchableOpacity activeOpacity={1} onPress={(e) => this.showAll(e)}>
          <Row>
            <Col ref={(col) => this.hidden['some_id_1'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[0]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_1')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      1
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_2'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[1]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_2')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      2
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_3'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[2]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_3')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      3
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_4'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[3]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_4')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      4
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_5'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[4]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_5')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      5
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_6'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[5]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_6')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      6
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_7'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[6]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_7')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      7
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_8'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[7]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_8')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      8
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_9'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[8]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_9')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      9
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_10'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[9]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_10')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      10
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_11'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[10]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_11')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      11
                    </Text>
                  </Col>
              </Row>
            </Col>
            <Col ref={(col) => this.hidden['some_id_12'] = col} smSize={100} mdSize={50} lgSize={33.333} xlSize={25} 
            style={{backgroundColor: colors[11]}} >
              <Row 
                  smSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.height / 2 : 0} 
                  mdSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 2 : 0} 
                  lgSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 3 : 0} 
                  xlSizePoints={this.state.layoutInfo ? this.state.layoutInfo.rowInfo.width / 4 : 0}
                  alignLines="stretch"
              >
                  <Col fullWidth> 
                    <Row rtl>
                      <Col fullWidth offsetPoints={10}>
                        <TouchableOpacity onPress={() => { this.hide('some_id_12')}}>
                          <Text style={{fontSize: 22, marginTop: 5}}>
                            X
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                  <Col fullWidth hAlign='center'> 
                    <Text style={{fontSize: 48, marginTop: 5}}>
                      12
                    </Text>
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

const colors = ['lightyellow', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'pink',
                'orange', 'yellow', 'lime', 'lightgreen', 'purple', 'magenta', 'gold']
```