# Even More Examples

## Responsive Layout

<img src="https://s2.postimg.org/im8oxf195/Screen_Shot_2017-04-17_at_2.59.31_PM.png" width=480>


### Navbar (ExNavigation - Todo: switch exampe to React Navigation)

```jsx

  static route = {
    navigationBar: {
      title: 'Home',
      renderTitle: (route, props) => {
        return (
        <Row fullHeight vAlign='middle'>
          <Col fullWidth hAlign='center'>
            <Image style={styles.titleImage} source={require('./assets/logo.png')}/>
          </Col>
        </Row>)
      },
      renderRight: (route, props) => {
        const { config: { eventEmitter }  } = route;
        return (
        <Col vAlign='middle'>
          <Row rtl>
            <Col offset={10}>
              <Button 
                title="LOG IN"
                color="#0A0A0A"
                onPress={() => {
                    eventEmitter.emit('openModal')
                  }
                }
              ></Button>
            </Col>
          </Row>
        </Col>)
      },
      backgroundColor: "#fff"
    }
  }

    ...
    
    // in styles:

    titleImage: {
      width: 120,
      height: 24,
      resizeMode: 'stretch' 
    }
```

### Main Screen

Note:

Remember that paddingTop and marginTop when given as percentages are percentages of the parent view's width, not of its height. This is per the CSS spec.

```jsx
    <ScrollView>
      <Row  style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
          <Col size={60} offset={6} >
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
            PREVIOUS ORDERS
            </Text>
          </Col>
          <Col size={34} offset={-6} hAlign='right'>
                <Text style={{ fontSize: 16, color: '#BD1206'}}>
                  SEE ALL
                </Text>
          </Col>
      </Row>

      <Row style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
          <Col size={80} offset={6} >

            <Row wrap>
              <Col size={50} smSize={100}>
                <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>February 28, 2017</Text>
                <Row>
                  <Col size={5}>
                    <FontAwesome name='shopping-cart' size={17} color='gray'/>
                  </Col>
                  <Col size={60} offset={2.5}>
                    <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>TAKEOUT ORDER</Text>
                  </Col>
                </Row>
              </Col>
              <Col size={50} smSize={100}>
                <Text style={{fontSize: 16, color: '#0a0a0a'}}>Grilld Cheese Sandwich</Text>
                <Text style={{fontSize: 16, color: '#0a0a0a'}}>Key Lime Pie</Text>
              </Col> 
            
            </Row>    

          </Col>
          <Col size={14} offset={-6} hAlign='right'>
                <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}} />
          </Col>
      </Row>

      <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
          <Col size={80} offset={6}>
            <Row wrap>
              <Col size={50} smSize={100}>
                <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>March 8, 2017</Text>
                <Row >
                  <Col size={5}>
                    <FontAwesome name='cutlery' size={17} color='gray'/>
                  </Col>
                  <Col size={60} offset={2.5}>
                    <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>DINE-IN ORDER</Text>
                  </Col>
                </Row>
              </Col>
              <Col size={50} smSize={100}>
                <Text style={{fontSize: 16, color: '#0a0a0a'}}>Linguini Alfredo</Text> 
              </Col>
            </Row>
          </Col>
          <Col size={14} offset={-6} hAlign='right'>
                <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}} />
          </Col>
      </Row>

      <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
          <Col size={80} offset={6}>
            <Row wrap>
              <Col size={50} smSize={100}>      
                <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>March 9, 2017</Text>
                <Row>
                  <Col size={5}>
                    <FontAwesome name='cutlery' size={17} color='gray'/>
                  </Col>
                  <Col size={60} offset={2.5}>
                    <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>TAKEOUT ORDER</Text>
                  </Col>
                </Row>
              </Col>
              <Col size={50} smSize={100}>
                <Text style={{fontSize: 16, color: '#0a0a0a'}}>Double Cheese Burger</Text>                                                                          
              </Col>
            </Row>
          </Col>
          <Col size={14} offset={-6} hAlign='right'>
                <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}} />
          </Col>
      </Row>

      <Row  style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
          <Col size={60} offset={6}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
            FAVORITE ITEMS
            </Text>
          </Col>
          <Col size={34} offset={-6} hAlign='right'>
                <Text style={{ fontSize: 16, color: '#BD1206'}}>
                ADD MORE
                </Text>
          </Col>
      </Row>

      <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={60} offset={6}>
          <Text style={{fontSize: 16, color: 'black'}}>
          Linguini Alfredo
          </Text>
        </Col>
          <Col size={34} offset={-6} hAlign='right'>
                <FontAwesome name='star' size={24} color='#BD1206'/>
          </Col>
      </Row>

      <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={60} offset={6}>
          <Text style={{fontSize: 16, color: 'black'}}>
          Double Cheese Burger
          </Text>
        </Col>
          <Col size={34} offset={-6} hAlign='right'>
                <FontAwesome name='star' size={24} color='#BD1206'/>
          </Col>
      </Row>
    </ScrollView>
```

## Custom Components

<img src="https://s8.postimg.org/7t9wefrrp/Screen_Shot_2017-04-17_at_2.59.00_PM.png" width=480>

```jsx
<Modal
      animationType="fade"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => this.close()}
      >
        <Row fullHeight vAlign='stretch' style={[{padding: 20}, modalBackgroundStyle]}>
          <Col fullWidth hAlign='center' style={{backgroundColor: "#f3f3f3", padding: 20}}>
                
                <Row style={{height: 80}}>
                  <Col size={33.333} offset={33.333} hAlign='center' >
                    <Text>
                      <Image source={require('./assets/logo-login.png')} style={styles.logoImage}/>
                    </Text>
                  </Col>
                  <Col size={33.333} hAlign='right'>
                    <TouchableHighlight activeOpacity={0.5} underlayColor='#f3f3f3' onPress={() => this.close()}>
                        <FontAwesome
                          name="close"
                          size={28}
                          color="#d0d0d0"
                        />
                    </TouchableHighlight>
                  </Col>
                </Row>

                <Row vAlign='middle' style={{height: 50}}>
                  <Text style={{fontFamily: 'lubalin-graph-regular', fontSize: 16}}>LOG IN TO YOUR ACCOUNT</Text>
                </Row>

                <Row  vAlign='middle' style={{height: 55}}>
                  <Col style={{height: 40, borderStyle: 'solid', borderColor: '#a0a0a0', borderWidth: 1, borderRadius: 2, padding: 10}}>
                    <Row>
                      <Col size={10} >
                          <FontAwesome name='envelope' size={20} color='#BD1206'/>
                      </Col>
                      <Col size={90}>
                          <TextInput placeholder='Email' style={{flex: 1}}/>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row vAlign='middle' style={{height: 55}}>
                  <Col style={{height: 40, borderStyle: 'solid', borderColor: '#a0a0a0', borderWidth: 1, borderRadius: 2, padding: 10}}>
                    <Row>
                      <Col size={10} >
                          <FontAwesome name='envelope' size={20} color='#BD1206'/>
                      </Col>
                      <Col size={90}>
                          <TextInput secureTextEntry={true} placeholder='Password' style={{flex: 1}}/>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row hAlign='center' style={{height: 12}}>
                  <Text style={{color: '#BD1206', fontSize: 12}}>
                  Forgot password?
                  </Text>
                </Row>

                <Row style={{ height: 20}}></Row>

                <Row  vAlign='middle' style={{height: 60}}>
                  <Col fullWidth hAlign='stretch'>
                    <TouchableHighlight activeOpacity={0.5} underlayColor='transparent' onPress={() => this.login()}>
                        <Row hAlign='center' vAlign='middle' style={{height: 36, borderRadius: 20, backgroundColor: '#BD1206'}}>
                            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>LOG IN</Text>
                        </Row>
                    </TouchableHighlight>
                  </Col>
                </Row>

                <Row vAlign='middle' style={{height: 60}}>
                  <Col style={{height: 1,  backgroundColor: '#a0a0a0'}}>
                  </Col>
                </Row>

                <Row style={{height: 60}}>
                  <Col vAlign='middle' style={{height: 36, borderRadius: 20, backgroundColor: '#3B5998'}}>
                    <Row  >
                      <Col size={10} offset={6}>  
                        <FontAwesome name='facebook' size={20} color='#f3f3f3'/>
                      </Col> 
                      <Col size={81} offset={3}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}> 
                          LOG IN WITH FACEBOOK
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
          </Col>
        </Row>
    </Modal>
```

## Wrapped Alignment

By default, content (plural) in Rows will wrap if the sum of the width values of the content is larger than 100% of the row's width. To prevent wrapping of content (plural) the Row must have the 'noWrap' prop supplied. When rows are allowed to wrap the row will contain two or more horizontal "lines" that hold the items within it. The lines themselves (as opposed to the items within them) may be aligned in the vertical direction using alignLines prop (see Props section above for details) 

Here are two screens illustrating the effect of wrap, vAlign and alignLines. The first tells the row that it can turn into a multi-line row that wraps the items. The second tells it how to vertically align the items. The third tells it how to vertically align the wrapped lines that contain the items. 

Markup #1:
```jsx
    <Row vAlign='top' alignLines='stretch' style={{height: 100, backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={60} offset={0} style={{backgroundColor: 'pink'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          PREVIOUS ORDERS
          </Text>
        </Col>
        <Col size={80} offset={0} hAlign='right' style={{backgroundColor: 'yellow'}}>
              <Text style={{ fontSize: 16, color: '#BD1206'}}>
                SEE ALL
              </Text>
        </Col>
    </Row>
```

<img src="https://s29.postimg.org/g5fmo0m8n/top.png" width=480>

Markup #2:
```jsx
    <Row vAlign='bottom' alignLines='stretch' style={{height: 100, backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={60} offset={0} style={{backgroundColor: 'pink'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          PREVIOUS ORDERS
          </Text>
        </Col>
        <Col size={80} offset={0} hAlign='right' style={{backgroundColor: 'yellow'}}>
              <Text style={{ fontSize: 16, color: '#BD1206'}}>
                SEE ALL
              </Text>
        </Col>
    </Row>
```

<img src="https://s16.postimg.org/albdekc8l/bottom.png" width=480>
