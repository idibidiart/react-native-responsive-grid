
# Responsive Grid for React Native

### Install

In your project folder, `yarn add react-native-responsive-grid`

## Why?

Developing performant, responsive and fairly detailed 2D layouts with raw flexbox in React Native used to take hours per screen and resulted in markup and styles that were almost unmaintainable. While Flexbox itself is confusing to new comers and too low-level for building responsive 2D layouts, the lack of a performant way in React Native to encode relative size info was the real obstacle. Then came React Native v0.42 and solved that problem. Since then there have been several folks who have made flexbox based responsive grids. I've taken one of the simplest and best thought-out ones, namely, `react-native-flexbox-grid` (by @rundmt), and I've made major changes and enhancements to it that result in a simpler mental model, one that is based entirely on percentages, yet fits within the grid construct. I ended up with a light weight abstraction that dissolves all the needless complexity of Flexbox, while allowing arbitrarily complex, responsive 2D layouts. 

## Show & Tell

With this layout system (aka "grid") we're able to build not only apps that adjust to the screen size of the device they're running on, but also ones that respond to layout changes, including layout changes resulting from rotating the device where the height becomes the width and vice versa, i.e. portrait vs landscape. 

See this video: [demo](https://www.youtube.com/watch?v=Nghqc5QFln8)

You may use this grid to design percentage based layouts that maintain their proportions on different screen sizes. You may also use this grid to decide what to hide/show for each screen sizes, using screen-width-based `hidden` props, and have specific alignments for each screen size, using screen-width-specific `offset` props. The demo in the video above only uses `hidden` props to pick the image with the right aspect ratio for the current screen width, responding to all layout changes that affect the given column's calculated width. The images just get replaced with ones that fit the current aspect ratio so they don't get distorted when stretched. As for font, a font only needs to be legible and does not need to grow with the space around it. We are talking about a short distance between the reader and the display and so regardless of how big is the tablet or phone the font size just needs to be legible. It would only need to grow if we're projecting on TV screen and standing far away. But the grid gives you the possibility of having different offsets for different screen sizes so grouped text can remain visually coherent as opposed to spread apart as screen size grows.

The demo in the video also uses a fixed/slightly modified version of Brent Vatne's (@brentvatne) react-native-fade-in-image, which you can find here: [repo](https://github.com/idibidiart/react-native-fade-in-image)  

## Design 

### _Beyond the Fixed-Column Grid_

This grid fixes the mental model for grid based layouts by abandoning the format-based, columns-per-view approach (e.g. "12 column grid") and instead allowing the developer to specify the width of each grid column as a percentage of parent view's size, so 10% meams 10 column grid, and 8.333% means a 12 column grid etc. But let's not think in terms of columns per grid! That is a visual formatting model, not a layout system. There is no reason for a grid to be 11, 12, 13, 14, 15 or 16.6 columns. The number should be determined by actual layout needs, not by some fixed grid template. Plus, all other style measurements are done using percentage when making responsive layouts, so why should we measure column width as n:12 (or n:11 etc) but measure everything else as n:100? It's time to fix this decoherence and move beyond the fixed-column grid, toward a free-form layout model that allows us to leverage grid behavior for responsive design but in a fluid and mathematically simpler way.

### _Eliminating Incidental Complexity_

Every task has an essential complexity. We often over-complicate things, or, in other words, introduce incidental complexity. I believe the Flexbox specification introduces incidental complexity relative to the task of creating 2D responsive layouts.

So the reasons we would use a grid on top of Flexbox is to abstract away the incidental complexity inherent in the Flexbox spec (by keeping it under the hood.) This includes confusing ideas like justifyContent and alignItems, which are dependent in their meaning on another part of the spec, namely, flexDirection. When flexDirection is 'row' then justifyContent operates horizontally. If it's 'column' then justifyContent operates vertically. The opposite for alignItems. This kind of 'semantic side effect' is rather strange and unexpected. I've chosen to replace that with vAlign and hAlign where v stands for vertical and h for horizontal. Both can be applied to rows AND columns but they retain their meaning: hAlign will always align content horizontally and vAlign will always align content vertically. 

While most React Native developers use `flex: n` (which is based on Facebook's Yoga layout algorithm) rather than the confusing mess of `flexGrow`, `flexShrink` and `flexBasis` (lots has been written about the Flexbox spec and its steep learning curve, e.g. [flex-grow is weird. Or is it?] (https://css-tricks.com/flex-grow-is-weird/)) there is still a fundamental problem with using `flex: n` since n is not a percentage of the view width or height but a comparative scale factor! It's much easier to say the View width or height is 100% and divide that however we like, e.g. 20%, 35% and 45%, than to specify n as 2, 3.5 and 4.5 because the latter set of values do not correspond to percentages. You can see that by adding a fourth item with some value, e.g. 5, which will cause all four elements to be contained in the full width or height of the parent (depending on parent's flexDirection) so n=2 no longer means 20% and n=5 no longer means 50%. It just means that the fourth item we added is 2.5 (5 divided by 2) times wider or taller than the first item. We lose perspective on the item sizes relative to the size of the parent as Flexbox is concerned with the item sizes relative to each other. It's like O(1) vs O(n^2) complexity. In other words, instead of relating the size of the item to the size of its parent as a percentage, with `flex: n` we relate the size of each item to the size of each other item, and we lose direct knowledge of the item's width or height as a percentage of the parent's width or height. Thinking in terms of related proportions, e.g. 5/2, 5/3.5 and 3.5/2, is clearly simpler when those proportions are measured as percentages (or as any n:x where x is fixed rather than variable)   

## _Hebrew and Arabic_

I've also found that RTL (right-to-left) support (for Hebrew/Arabic apps) to be generally lacking in grids, so I added support for it in this grid. 

## _Logic Depends on Consistency_

Finally, to keep the grid's structure and design simple (as well as logical and consistent) I've added a constraint such that Rows may not contain other Rows as children (they must be wrapped in a Column inside the row) and Columns may not contain other columns as children (they must be wrapped in a Row inside the column) 

If you'd like to build apps that respond to layout changes (due to device oriehtation changes or increase in the calculated width of the column), Columns must be contained in Row (this latter requirement will be eliminated when we upgrade to React Native 0.43)

Enjoy, and please report any issues.

## Terms:

RTL = right-to-left layout (Hebrew/Arabic)
LTR = "normal" left-to-right layout

## Usage

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col size={25} offset={5}>
      <Text>
        First Column
      </Text>
    </Col>
    <Col sm={60} smOffset={10} md={40} mdOffset={30} lg={30} lgOffset={40} >
      <Text>
        Second Column
      </Text>
    </Col>
</Row>
```

`size` may be supplied as prop to Column. Possible values is 0 to Infinity. This number defines the width of the column is as a percentage of its parent view's computed or absolute width. It defaults to content width (or no width.) Since `size` accepts any number from 0 to Infinity (or horizontal scroll limit), you can make the column as wide as you want. 

`sm`, `md`, `lg` and `xl` are device-dependent 'size' values that are applied to columns.

`offset`, `smOffset`, `mdOffset`, `lgOffset` and `xlOffset` - Accepts any number. This number defines the marginLeft (or marginRight in csase of RTL mode) for the column as a percentage of its parent view's computed or absolute width. Offset values can also be negative. Default is 0. Offsets in LTR mode apply to marginLeft whereas offsets in RTL mode apply to marginRight.   

`vAlign` may be supplied as prop to Column to vertically align the elements and/or rows within it. Possible values are: middle, top, bottom, space and distribute. Default is top.

`vAlign` may also be supplied as prop to Row to align the columns within it in the vertical direction. Possible values are: top, middle, bottom and stretch. Default is top.

`hAlign` may be supplied as prop to Row to align the columns within it in the horizontal direction. Possible values are: center, left, right, space and distribute. Default is left.

`hAlign` may also be supplied as prop to Column to align its rows and/or elements within it in the horizontal direction. Possible values are: center, left, right, and stretch. Default is left.

`rtl` may be supplied as prop to Row to both reverse the order of columns (or elements) inside a row as well as to set alignX to 'right.' This is useful for Hebrew and Arabic layouts. 

`full` may be supplied as prop to Row. It sets the the row's height to 100% of the computed or absolute height of its parent view. It also sets vAlign on the row to 'stretch' which vertically stretches its children to fill its height, unless vAlign is explicitly supplied with another value.

`full` may be supplied as prop to Column. It sets the the column's width to 100% of the computed or absolute width of its parent view. It also sets hAlign on the column to 'stretch' which horizontally stretches its children to fill its width, unless hAlign is explicitly supplied with another value.

`wrap` may be supplied as prop to Row. Currently, `flexWrap: 'wrap'` has known issues in React Native (see: [https://github.com/facebook/react-native/issues/8960](https://github.com/facebook/react-native/issues/8960)). So the default is 'nowrap' unless `wrap` is provided as prop on the row.

These make up the basic rules from which arbirarily complex layout behavior may emerge. 

### Sizing & Offsets

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col sm={60} md={40} lg={30} smOffset={10} mdOffset={20} lgOffset={30}>
        <Text>First Column</Text>
    </Col>
</Row>
```

There are currently four size props for `Column` that determine its width as a percentage. The values are indicated by `size`, `sm`, `md`, `lg` and `xl`. The first one, `size`, applies to all screen sizes. The others apply to screen widths of 0-480, 768-1023, 1024-1365, and 1366 and larger, respectively. 

There are also four offset props for `Column` that determine it's offset as a percentage (from left in case of LTR and from right in case of RTL.) The values are indicated by `offset`, `smOffset`, `mdOffset`, `lgOffset` and `xlOffset`. The first one, `offset`, applies to all screen sizes. The others apply to screen widths of 0-480, 768-1023, 1024-1365, and 1366 and larger, respectively. Unlike size values, offset values can be positive _or_ negative.

If you're nesting a column inside a row which is inside another column that is inside another row as below:

```
<Row>
    <Col size={50}>
      <Row>
        <Col size={50}>
          <Text>
            This column is 25% of the width of the top level row
          </Text>
        </Col>
      </Row>
    </Col>
</Row>

```

The nested column's size will be the column size value (size, sm, md, lg) times the colPercent of its parent row, so, in effect, we get nested percentages, e.g. 50% of parent row's width which is 50% of its parent row's width means the nested column is 25% of the top level row's width. 

This nested percentages model applies to offsets, too.. 

The `size`, `offset` and `hidden` props are based on the current screen width (taking device pixel ratio into consideration and orientation, i.e. width in portrait is treated as height in landscape, and vice versa.)

sm: <= 480px
md: > 480 && < 1024
lg: >= 1024 && < 1366
xl: >= 1366 

Example: 

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

### Hidden props

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col smHidden>
        <Text>Phone Column</Text>
    </Col>
    <Col mdHidden lgHidden xlHidden>
        <Text>Tablet Column</Text>
    </Col>
</Row>
```

In this example the column and all of it's children will be hidden on small screens like phones, but it will appear on bigger screens like tablets. The size-prefixed 'hidden' props may be applied to columns.

Every screen size (`sm`, `md`, `lg` and `xl`) has a hidden prop associated with it.

Hidden props are all booleans. They default to false.

## Real world example using relative size and offset props:

![demo](https://s2.postimg.org/im8oxf195/Screen_Shot_2017-04-17_at_2.59.31_PM.png)

### Navbar styles (for ex-navigation)

```
  in route's HOC:

  static route = {
      navigationBar: {
        title: 'Home',
        renderTitle: (route, props) => {
          return (
          <Row full vAlign='center'>
            <Col full hAlign='center'>
              <Image style={styles.titleImage} source={require('./assets/logo.png')}/>
            </Col>
          </Row>)
        },
        renderRight: (route, props) => {

          const { config: { eventEmitter }  } = route;

          return (<Row full vAlign='center'>
            <Col full hAlign='right'>
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

Note that in the markup below the right arrow icons have padding on the right and left (they should not but I guess they were converted from vector to image and that's how they got their extra padding) so a good way to deal with that is not by using fractional offset value as that will change with screen size while the font remains the same size which would misalign the icons relative to the right-aligned text like SEE ALL, ADD MORE and the start icon (which has no padding in it) -- the right to compensate for icons that have padding in them is by using absolute pixels in the style prob, e.g. left: 6. That is unless your font is responsive, in which case using fractional offset would be the right way.

```
    <Row nowrap style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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

    <Row nowrap style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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

    <Row nowrap style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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

    <Row nowrap style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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

    <Row nowrap style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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

    <Row nowrap style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={60} offset={6}>
        <Text style={{fontSize: 16, color: 'black'}}>
        Linguini Alfredo
        </Text>
      </Col>
        <Col size={34} offset={-6} hAlign='right'>
              <FontAwesome name='star' size={24} color='#BD1206'/>
        </Col>
    </Row>

    <Row nowrap style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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
      <Row full style={[{padding: 20}, modalBackgroundStyle]}>
        <Col full hAlign='center' style={{backgroundColor: "#f3f3f3", padding: 20}}>
              
              <Row nowrap style={{height: 80}}>
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

              <Row nowrap vAlign='middle' style={{height: 55}}>
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

              <Row nowrap vAlign='middle' style={{height: 60}}>
                <Col full>
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
                  <Row nowrap >
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