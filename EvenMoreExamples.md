# Even More Examples

<img src="https://s2.postimg.org/im8oxf195/Screen_Shot_2017-04-17_at_2.59.31_PM.png" width=480>

_

### Navbar layout (for ex-navigation)

```

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
          return (<Row fullHeight rtl vAlign='middle'>
            <Col offset={1}>
              <Button 
                title="LOG IN"
                color="#0A0A0A"
                onPress={() => {
                    eventEmitter.emit('openModal')
                  }
                }
              ></Button>
            </Col>
          </Row>)
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

### main screen layout

Note:

Remember that paddingTop and marginTop when given as percentages are percentages of the parent view's width, not of its height. This is per the CSS spec.

```
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
          <Col size={50} breakPoints={{sm: 200}}>
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
          <Col size={50} breakPoints={{sm: 200}}>
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
          <Col size={50} breakPoints={{sm: 200}}>
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
          <Col size={50} breakPoints={{sm: 200}}>
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
          <Col size={50} breakPoints={{sm: 200}}>      
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
          <Col size={50} breakPoints={{sm: 200}}>
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
```