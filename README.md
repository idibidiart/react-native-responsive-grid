
# Dynamic, Responsive Grid-based Layout for Universal and Orientation-Aware React Native Apps 

### Install

In your project folder, `yarn add react-native-responsive-grid`

## Background

Developing dynamic, responsive 2D layouts with Flexbox and JS for oriention-aware and Universal React Native apps used to take hours per screen and resulted in code that was almost unmaintainable. 

While Flexbox itself may be confusing to new comers and too low-level for building dynamic, responsive 2D layouts, the lack of a performant, declaratuve way in React Native to encode relative size info was the real obstacle. Then came React Native v0.42 and solved that problem. Since then there have been several folks who have made flexbox based responsive grids. I've taken one of the simplest and best thought-out ones, namely, `react-native-flexbox-grid` (by @rundmt), and made dramatic changes and enhancements to it that have resulted in a simple but powerful layout model that eliminates Flexbox's incidental complexity and gives us a really easy and quick way to build dynamic, responsive layouts for Universal and orientation-aware apps.

## About

With this grid we're able to build not only 2D layouts that adjust to the screen size of the device they're running to retain intended proportions, but also ones that respond to layout changes, including layout changes resulting from a change in device orientation. 

You may use this grid to build 2D layouts that maintain their proportions on different screen sizes. You may also use this grid to decide what image sources to use for each screen size and orientation, using the `aspectRatio` prop, and have different offset of elements for each screen size, using screen-width-specific `offset` props. You may also hide and show elements based on screen size, screen-width-specific `hidden` props.

See this video: [demo](https://www.youtube.com/watch?v=Nghqc5QFln8)

The demo in the video above uses only the `aspectRatio` prop to pick the image with the right aspect ratio in response to a layout change that affect the given column's computed styles, which in the case of this demo is a device orientation change that affects the column's computed width. The image simply get replaced with one that is prepared by the designer during the development process so that it fits the targetted aspect ratio. Since there could be many aspect ratios that correspond to different devices we should have multiple such images prepared by the designer for the supported aspect ratios (and their rotated versions, if the app supports both portrait and landscape.)

The aspect ratio (width to height, in portrait mode) of iPhones is 1:1.5 for the older models and 1:1.78 for the recent models. The aspect ratio of iPad models is 1:1.33. These aspect ratios are reversed when the screen is rotated to landscape mode. 

**iPhone**
- 320 x 480 points --> 1:1.5	(iPhone 4, in portrait mode)
- 480 x 320 points --> 1.5:1	(iPhone 4, in landscape mode)
- 320 x 568 points --> 1:1.78	(iPhone 5, in portrait mode)
- 568 x 320 points --> 1.78:1	(iPhone 5, in landscape mode)
- 375 x 667 points --> 1:1.78 (iPhone 6/7, in portrait mode)
- 667 x 375 points --> 1.78:1 (iPhone 6/7, in landscape mode)
- 414 x 736 points --> 1:1.78 (iPhone 6/7 Plus, in portrait mode)
- 736 x 414 points --> 1.78:1 (iPhone 6/7 Plus, in landscape mode)

**iPad**
- 1024 x 768 points	--> 1.33:1 (iPad Mini, iPad Air and small iPad Pro, landscape)
- 768 x 1024 points	--> 1:1.33 (iPad Mini, iPad Air and small iPad Pro, portrait)
- 1366 x 1024 points --> 1.33:1 (Large iPad Pro, landscape)
- 1024 x 1366 points --> 1:1.33 (Large iPad Pro, portrait)


**Example**

```
    <Row aspectRatio={{w: 1, h: 1.5}}>
      <Col>
        <FadeIn>
          <Image source={require('./assets/homepage hero-1-1.5.jpg')} style={styles.homeImage}></Image>
        </FadeIn>
      </Col>
    </Row>
    <Row aspectRatio={{w: 1.5, h: 1}}>
      <Col>
        <FadeIn>
          <Image source={require('./assets/homepage hero-1.5-1.jpg')} style={styles.homeImage}></Image>
        </FadeIn>
      </Col>
    </Row>
    <Row aspectRatio={{w: 1, h: 1.78}}>
      <Col>
        <FadeIn>
          <Image source={require('./assets/homepage hero-1-1.78.jpg')} style={styles.homeImage}></Image>
        </FadeIn>
      </Col>
    </Row>
    <Row aspectRatio={{w: 1.78, h: 1}}>
      <Col >
        <FadeIn>
          <Image source={require('./assets/homepage hero-1.78-1.jpg')} style={styles.homeImage}></Image>
        </FadeIn>
      </Col>
    </Row>
```

When it comes font scaling, a font only needs to be legible and does not need to grow with the space around it. That's because the mobile app user maintains the same relatively short distance from the display regardless of display size, so the font size simply needs to be legible, and does not need to grow or shrink with the screen. Having said that, there is nothing to prevent us from using a percentage value for font size so it would grow/shrink with the column width. 

The demo in the video also uses a fixed/slightly modified version of Brent Vatne's (@brentvatne) react-native-fade-in-image, which you can find here: [repo](https://github.com/idibidiart/react-native-fade-in-image)  

## Design 

### _Beyond Fixed-Column Grid_

This grid fixes the mental model for grid based layouts by abandoning the format-based, columns-per-view approach (e.g. "12 column grid") and instead allowing the developer to specify the width of each grid column as a percentage of parent view's size, so 10% meams 10 column grid, and 8.333% means a 12 column grid etc. But let's not think in terms of columns per grid! That is a visual formatting model, not a layout system. There is no reason for a grid to be 11, 12, 13, 14, 15 or 16.6 columns. The number should be determined by actual layout needs, not by some fixed grid template. Plus, all other style measurements are done using percentages when making responsive layouts, so why should we measure column width as n:12 (or n:11 etc) but measure everything else as n:100? It's time to fix this decoherence and move beyond the fixed-column grid, toward a free-form layout model that allows us to leverage grid behavior for responsive design but in a fluid and mathematically simpler way.

### _Hiding Flexbox's Complexity_

Every task has an essential degree of complexity, and we often introduce additional incidental complexity in how we perform that task. I believe that using Flexbox styling when creating 2D responsive layouts introduces a lot of incidental complexity.

While most React Native developers use `flex: n` (which is based on Facebook's Yoga layout algorithm) rather than the confusing mess of `flexGrow`, `flexShrink` and `flexBasis` (lots has been written about the Flexbox spec and its steep learning curve, e.g. [flex-grow is weird. Or is it?](https://css-tricks.com/flex-grow-is-weird/)) there is still a fundamental problem with using `flex: n` since n is not a percentage of the parent view's computed or explicit width or height but a comparative size factor! It's much easier to say the View width or height is 100% and divide that however we like, e.g. 20%, 35% and 45%, than to specify n as 0.2, 0.35 and 0.45 because the latter set of values do not correspond to percentages. You can see that by adding a fourth item with some value, e.g. 0.5, which will cause all four elements to be contained in the full width or height of the parent (depending on parent's flexDirection) so n=0.2 no longer means 20% and n=0.5 no longer means 50%. It just means that the fourth item we added is 2.5 (0.5 divided by 0.2) times wider or taller than the first item. We lose perspective on the item sizes relative to the size of the parent as Flexbox is concerned with the item sizes relative to each other rather that the size of each item relative to the common parent. It's like O(n) vs O(n^2) complexity for these two different sizing models in that instead of relating the size of each item to the size of its parent as a percentage (n steps), with `flex: n` we relate the size of each item to the size of each other (sibling) item (n^2 steps.) That's because we don't have one value (parent's width) to measure against. More importantly, we give up direct knowledge of each item's width or height as a percentage of the parent's width or height in favor of having comparative size factors for the sibling items. However, there are times when we'd like to have that, so this grid does not take that ability away from us. A good example would be when using the 'hidden' props where we may hide and show items based on screen size, so that if some item gets hidden the other items will fill the space left by it. So nothing prevents us fron using `flex: n` with this grid, but we don't have to use it where we don't need its more complex behavior, which is most of the time when building responsive layouts that must behave in a cognitively simple and predictable way. Having said that, this grid relies heavily on Flexbox features like justifyContent and alignItems, but uses them under the hood and combines them with simpler percentage-bassed sizing model. So it's the best of both worlds.   

### _Working in Both Directions_

Sometimes, we lay things out from left to right. Other times, we might find it easier to lay things out from right to left. I've found that RTL (right-to-left) support to be generally lacking in grids, so I added support for it in this grid. This can also be very useful for apps with right-to-left layouts like those containing text in Arabic, Aramaic, Azeri, Dhivehi/Maldivian, Hebrew, Kurdish (Sorani), Persian/Farsi, and Urdu...

### _A Consistent Pattern_

Finally, to keep the grid's structure and design simple (as well as logical and consistent) I've added a constraint such that Rows may not contain other Rows as children (they must be wrapped in a Column inside the row) and Columns may not contain other columns as children (they must be wrapped in a Row inside the column) 

If you'd like to build apps that respond to layout changes (due to device oriehtation changes or increase in the calculated width of the column), Columns must be contained in a Row.

Enjoy, and please report any issues.

## Terms:

RTL = right-to-left layout (Hebrew/Arabic)
LTR = "normal" left-to-right layout

## Props

`size` may be supplied as prop to Column. Possible values is 0 to Infinity. This number defines the width of the column is as a percentage of its parent view's computed or absolute width. It defaults to content width (or no width.) Since `size` accepts any number from 0 to Infinity (or horizontal scroll limit), you can make the column as wide as you want. 

`sm`, `md`, `lg` and `xl` are device-dependent 'size' values that are applied to columns.

`offset`, `smOffset`, `mdOffset`, `lgOffset` and `xlOffset` - may be applied to Column. Accepts any number. This number defines the marginLeft (or marginRight in csase of RTL mode) for the column as a percentage of its parent view's computed or explicitly set width. Offset values can also be negative. Default is 0.

`smHidden`, `mdHidden`, `lgHidden` and `xlHidden` - may be applied to Column. This tells the grid to hide certain columns based on the current width of the screen.  

`aspectRatio` maybe applied to Column. The grid computes the current aspect ratio of the device (which reverses with orientation) and based on that excludes from display any columns that have an `aspectRatio` prop that has a different aspect ratio. If no `aspectRatio` is supplied the column will be displayed at all aspect ratios.

`vAlign` may be supplied as prop to Column to vertically align the elements and/or rows within it. Possible values are: middle, top, bottom, space and distribute. Default is top.

`vAlign` may also be supplied as prop to Row to align the columns within it in the vertical direction. Possible values are: top, middle, bottom and stretch. Default is top.

`hAlign` may be supplied as prop to Row to align the columns within it in the horizontal direction. Possible values are: center, left, right, space and distribute. Default is left.

`hAlign` may also be supplied as prop to Column to align its rows and/or elements within it in the horizontal direction. Possible values are: center, left, right, and stretch. Default is left.

`rtl` may be supplied as prop to Row to both reverse the order of columns (or elements) inside a row as well as to set alignX to 'right.' This is useful for Hebrew and Arabic layouts. 

`full` may be supplied as prop to Row. It sets the the row's height to 100% of the computed or absolute height of its parent view. 

`full` may be supplied as prop to Column. It sets the the column's width to 100% of the computed or absolute width of its parent view. 

`wrap` may be supplied as prop to Row. Currently, `flexWrap: 'wrap'` has known issues in React Native (see: [https://github.com/facebook/react-native/issues/8960](https://github.com/facebook/react-native/issues/8960)). So the default is '' unless `wrap` is provided as prop on the row.

These make up the basic rules. As you can see the number of rules is _far_ fewer than with bare-bone Flex. This makes it a much simpler task to create sophisticated dynamic layout behavior (fewer knobs and switches.) 

## Usage

There are five 'size' props for `Column` that determine its width as a percentage. The values are indicated by `size`, `sm`, `md`, `lg` and `xl`. The first one, `size`, applies to all screen sizes. The others apply to screen widths of 0-480, 768-1023, 1024-1365, and 1366 and larger, respectively. 

There are five 'offset' props for `Column` that determine it's offset as a percentage (from left in case of LTR and from right in case of RTL.) The values are indicated by `offset`, `smOffset`, `mdOffset`, `lgOffset` and `xlOffset`. The first one, `offset`, applies to all screen sizes. The others apply to screen widths of 0-480, 768-1023, 1024-1365, and 1366 and larger, respectively. Unlike size values, offset values can be positive _or_ negative.

There are four 'hidden' props for `Column` that determine whether the column is displayed or not at the given screen size. This is indicated by `smHidden`, `mdHidden`, `lgHidden` and `xlHidden`.  They apply to screen widths of 0-480, 768-1023, 1024-1365, and 1366 and larger, respectively.

The size-specific _size_ props (sm, md, lg, and xl), the size-specific _offset_ props (smOffset, mdOffset, lgOffset and xlOffset) and the size-specific _hidden_ props (smHidden, mdHidden, lgHidden, xlHidden) props refer to the effective screen width, which changes with orientation. 

The following are the screen width thresholds for these props:

sm: <= 480px 
md: > 480 and < 1024
lg: >= 1024 and < 1366
xl: >= 1366 

Examples: 

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col sm={50} md={33.333} lg={25}>
        <Text>First Column</Text>
    </Col>
</Row>
```

On a phone the Column would take up 50% of the row's width.
On a normal tablet the Column would take up 33.333% of the row's width.
On a big tablet the Column would take up 25% of the row's width.

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row style={{height: 20}}>
  <Col smOffset={0} mdOffset={10} lgOffset={20} xlOffset={40}>
    <Text>test</Text>
  </Col>
</Row>
```

In the example above, the text "test" will move further to the right with larger screen sizes.

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col smHidden>
        <Text>Column displayed when width is <= 480</Text>
    </Col>
    <Col mdHidden lgHidden xlHidden>
        <Text>Column displayed when width is > 480</Text>
    </Col>
</Row>
```

In the example above, the column and all of it's children will be hidden on small screens like phones, but it will appear on bigger screens like tablets. The size-prefixed 'hidden' props may be applied to columns. Hidden props are all booleans. They default to false.

## Nested Dimensions

If you're nesting a column inside a row which is inside another column that is inside another row as below:

```
<Row>
    <Col size={50}>
      <Row>
        <Col size={50}>
          <Text>
            This column is 25% of the outer view's width (or 25% of the screen width if
            the top level Row has no parent)
          </Text>
        </Col>
      </Row>
    </Col>
</Row>

```

The nested column's size will be the column size value (size, sm, md, lg, xl) as a percentage of the width of the preceding column in the hierarchy . 

This nested percentages model applies to offsets, too. 

## Real world example using relative size and offset props:

![demo](https://s2.postimg.org/im8oxf195/Screen_Shot_2017-04-17_at_2.59.31_PM.png)

### Navbar layout (for ex-navigation)

```

  static route = {
      navigationBar: {
        title: 'Home',
        renderTitle: (route, props) => {
          return (
          <Row full vAlign='middle'>
            <Col full hAlign='center'>
              <Image style={styles.titleImage} source={require('./assets/logo.png')}/>
            </Col>
          </Row>)
        },
        renderRight: (route, props) => {
          const { config: { eventEmitter }  } = route;
          return (<Row full rtl vAlign='middle'>
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

  <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={60} offset={6} >
        <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>February 28, 2017</Text>
        <Row >
          <Col size={5}>
            <FontAwesome name='shopping-cart' size={17} color='gray'/>
          </Col>
          <Col size={60} offset={2.5}>
            <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>TAKEOUT ORDER</Text>
          </Col>
        </Row>
        <Text style={{fontSize: 16, color: '#0a0a0a'}}>Grilld Cheese Sandwich</Text>
        <Text style={{fontSize: 16, color: '#0a0a0a'}}>Key Lime Pie</Text>                                                                             
      </Col>
      <Col size={34} offset={-6} hAlign='right'>
            <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}} />
      </Col>
  </Row>

  <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={60} offset={6}>
          <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>March 8, 2017</Text>
          <Row >
            <Col size={5}>
              <FontAwesome name='cutlery' size={17} color='gray'/>
            </Col>
            <Col size={60} offset={2.5}>
              <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>DINE-IN ORDER</Text>
            </Col>
          </Row>
        <Text style={{fontSize: 16, color: '#0a0a0a'}}>Linguini Alfredo</Text>                                                                          
      </Col>
      <Col size={34} offset={-6} hAlign='right'>
            <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}} />
      </Col>
  </Row>

  <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={60} offset={6}>
          <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>March 9, 2017</Text>
          <Row>
            <Col size={5}>
              <FontAwesome name='cutlery' size={17} color='gray'/>
            </Col>
            <Col size={60} offset={2.5}>
              <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>TAKEOUT ORDER</Text>
            </Col>
          </Row>
        <Text style={{fontSize: 16, color: '#0a0a0a'}}>Double Cheese Burger</Text>                                                                          
      </Col>
      <Col size={34} offset={-6} hAlign='right'>
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

## RTL Support

This is intended for Hebrew and Arabic layouts, which are right to left.

Notice the reversed order of the Text relative to the physical order in the markup. Also notice that columns are justified as flex-end within the row and their content is rightAligned (except for the second column which is explicitly leftAligned to mimic the rightAligned behavior in normal ltr layout)

![demo](https://s18.postimg.org/gr89vaghl/Screen_Shot_2017-04-07_at_6.47.22_PM.png)

### Normal LTR Markup 

```
    <Row style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={60} offset={6} >
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          PREVIOUS ORDERS
          </Text>
        </Col>
        <Col size={30} hAlign='right'>
          <Text style={{ fontSize: 16, color: '#BD1206'}}>
            SEE ALL
          </Text>
        </Col>
    </Row>
```

### RTL Markup

Notice the offset values work in RTL direction now. The addition of .7 offset is to mimic the fact that the left margin in the LTR layout is smaller than the right margin in that layout, whereas it's the opposite in the RTL direction. So the .7 offset is used in RTL layout instead of the 1 offset, so alignment is identical. 

```
    <Row rtl style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={60} offset={4} >
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          PREVIOUS ORDERS
          </Text>
        </Col>
        <Col size={30} hAlign='left'>
          <Text style={{ fontSize: 16, color: '#BD1206'}}>
            SEE ALL
          </Text>
        </Col>
    </Row>
```

## Another Real-World Example (Advanced)

![demo](https://s8.postimg.org/7t9wefrrp/Screen_Shot_2017-04-17_at_2.59.00_PM.png)

```
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => this.close()}
      >
      <Row full vAlign='stretch' style={[{padding: 20}, modalBackgroundStyle]}>
        <Col full hAlign='center' style={{backgroundColor: "#f3f3f3", padding: 20}}>
              
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
                <Col full hAlign='stretch'>
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