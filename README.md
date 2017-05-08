
# Dynamic, Responsive Grid-based Layout for Universal and Orientation-Aware React Native Apps 

### Install

In your project folder, `yarn add react-native-responsive-grid`

*requires React Native 0.43.x or newer 

## Background

Developing dynamic, responsive 2D layouts with Flexbox and JS for oriention-aware and Universal React Native apps used to take hours per screen and resulted in code that was almost unmaintainable. 

While Flexbox itself is too low-level and time consuming when it comes to building responsive and Universal apps, the lack of a performant, declarative way in React Native to encode size values as percentages was the real obstacle. Then came React Native v0.42 and solved that problem. Since then there have been several folks who have made responsive grids that takle advantage of percentage-based layout. I've taken one of the simplest and most well-thought-out ones, namely, `react-native-flexbox-grid` (by @rundmt), and made some significabnt changes and enhancements to it that have resulted in a simple yet powerful layout model.

## Introduction

You may use this grid to build responsive 2D layouts that maintain _OR_ predictably change their relative proportions, basic structure and what content they display based on screen size, aspect ratio and orientation.  

## [>> aspectRatio demo <<](https://www.youtube.com/watch?v=Nghqc5QFln8)

The demo in the video above shows some of those abilities, and this grid is capable of far more (see Props and Usage sections.) 

The grid can pick the image with the **closest aspect ratio** to the device aspect ratio, dynamically, taking into account the current device orientation. The images themselves must be cropped by the designer so that they match the common device aspect ratios (see below) while also showing the part of the image that the designer intends to show for each aspect ratio. Since there could be many aspect ratios that correspond to different devices we should have multiple such images (and, optionally, their rotated versions.)

The following table maps some common device aspect ratios to the ratio of width/height of devices known to this developer, for both landscape and portrait device orientations. The physical device aspect ratio does not change with device rotation (i.e. a device with 16:9 aspect ratio does not become one with a 9:16 aspect ratio when it's rotated, although it does mathematically), but since the width and height get flipped when changing orientation from portrait to lanscape and vice versa, we need to have two images per each physical device aspect ratio, one for portrait mode and the other for landscape. However, if our app only supports portrait or landscape mode then we only need to have the one corresponding to that orientation. 

| Aspect Ratio | Width | Height | Width/Height Ratio (landscape) | Devices 
| :---: | :---: | :---: | :---: | :---: | 
| '16:9' | 568 | 320 | 1.77 | iPhone 5
| '16:9' | 667 | 375 | 1.77 | iPhone 6 & 7
| '16:9' | 736 | 414 | 1.77 | iPhone 6 Plus & 7 Plus
| '16:10' | ? | ? | 1.6 | ?
| '3:2' | 480 | 320 | 1.5 | iPhone 4
| '4:3' | 1024 | 768 |  1.33 | iPad Mini, iPad Air and small iPad Pro
| '4:3' | 1366 | 1024 | 1.33 | Large iPad Pro
| '1:1' | 1 | ? | ? | ?

| Aspect Ratio | Width | Height | Width/Height Ratio (portrait) | Devices
| :---: | :---: | :---: | :---: | :---: | 
| '16:9' | 320 | 568 | 0.56 | iPhone 5
| '16:9' | 375 | 667 | 0.56 | iPhone 6 & 7
| '16:9' | 414 | 736 | 0.56 | iPhone 6 Plus & 7 Plus
| '16:10' | ? | ? | 0.625| ? 
| '3:2' | 320 | 480 | 0.66 | iPhone 4
| '4:3' | 768 | 1024 | 0.75 | iPad Mini, iPad Air and small iPad Pro
| '4:3' | 1024 | 1366 | 0.75 | Large iPad Pro
| '1:1' | 1 | ? | ? | ?

**Example**

```
    <Row>
      <Col fullWidth aspectRatio={{ratio: '3:2', orientation: "portrait"}}>
          <Image source={require('./assets/homepage hero-3-2-portrait.jpg')} style={styles.homeImage}></Image>
      </Col>
    </Row>
    <Row>
      <Col fullWidth aspectRatio={{ratio: '3:2', orientation: "landscape"}}>
          <Image source={require('./assets/homepage hero-3-2-landscape.jpg')} style={styles.homeImage}></Image>
      </Col>
    </Row>
    <Row>
      <Col fullWidth aspectRatio={{ratio: '16:9', orientation: "portrait"}}>
          <Image source={require('./assets/homepage hero-16-9-portrait.jpg')} style={styles.homeImage}></Image>
      </Col>
    </Row>
    <Row>
      <Col fullWidth aspectRatio={{ratio: '16:9', orientation: "landscape"}}
          <Image source={require('./assets/homepage hero-16-9-landscape.jpg')} style={styles.homeImage}></Image>
      </Col>
    </Row>
```

-

## Principles

### _Embracing Simplicity_

This grid fixes the mental model for grid based layouts by abandoning the format-based, columns-per-view approach (e.g. "12 column grid") and instead allowing the developer to specify the width of each grid column as a percentage of parent view's size, so 10% meams 10 column grid, and 8.333% means a 12 column grid etc. But let's not think in terms of columns per grid! That is a visual formatting model, not a layout system. There is no reason for a grid to be 11, 12, 13, 14, 15 or 16.6 columns. The number should be determined by actual layout needs, not by some fixed grid template. Plus, all other style measurements are done using percentages when making layouts that respond [predictably] to layout change, so why should we measure column width as n:12 (or n:11 etc) and yet measure everything else as n:100? It's time to fix this decoherence and move beyond the fixed-column grid toward a free-form layout model, one that allows us to leverage grid behavior but in a simple way.

### _Eschewing Complexity_

While most React Native developers use `flex: n` (which is based on Facebook's Yoga layout algorithm) rather than the confusing mess of `flexGrow`, `flexShrink` and `flexBasis` (lots has been written about the Flexbox spec and its steep learning curve, e.g. [flex-grow is weird. Or is it?](https://css-tricks.com/flex-grow-is-weird/)) there is still a fundamental problem with using `flex: n` since n is not a percentage of the parent view's computed or explicit width or height (as percentages are in CSS) but a comparative size factor! It's much easier to say the parent view's width or height is 100% and divide that however we like, e.g. 20%, 35% and 45% than to specify n as 0.2, 0.35 and 0.45 because the latter set of values do not correspond to percentages. You can see that by adding a fourth item with some value, e.g. 0.5, which will cause all four elements to be contained in the full width or full height of the parent (width or height depends on parent's flexDirection) so n=0.2 no longer means 20% and n=0.5 no longer means 50%. It just means that the fourth item we added is 2.5 (0.5 divided by 0.2) times wider or taller than the first item. We lose perspective on the item size relative to the size of its parent as Flexbox is concerned with the item sizes relative to each other rather that the size of each item relative to a single parent. It's like O(n) vs O(n^2) complexity for these two different sizing models in that instead of relating the size of each item to the size of its parent as a percentage (n steps), with `flex: n` we relate the size of each item to the size of each other (sibling) item (n^2 steps.) That's because we don't have a single scale (parent's width or height) to measure against. More importantly, we give up direct knowledge of each item's width as a percentage of the parent's width in favor of having comparative size factors for the sibling items. However, there are times when we'd like to have that, so this grid does not take that ability away from us. In fact, this grid relies heavily (under the hood) on Flexbox features like justifyContent, alignItems, and alignContent, but it uses combines them with a much simpler  percentage-based layout. This results in a layout system that is simple, predictable and powerful.

### _RTL Support_

Sometimes, we lay things out from left to right (LTR.) Other times, we might find it easier to lay things out from right to left (RTL.) I've found that RTL support to be generally lacking in both React and React Native grids, so I've added support for it. React makes it really simple. This can be very useful for apps with right-to-left text, i.e. Arabic, Aramaic, Azeri, Dhivehi/Maldivian, Hebrew, Kurdish (Sorani), Persian/Farsi, and Urdu.

### _Consistent, Repeatable, Nestable_

To keep the grid's structure and design simple (as well as logical and consistent) Rows may not contain other Rows as children (they must be wrapped in a Column inside the row) and Columns may not contain other columns as children (they must be wrapped in a Row inside the column) 

### _Dynamic Resoponse_

Being able to readt to layout changes, including changes due to device rotation (for apps that allow it), is a key aspect of responsive design. This grid enables dynamic layouts (see the demos at the start of this Readme) 

**Note**

If you'd like to build apps that respond to layout changes (due to device oriehtation and aspect ratio changes or any change in the computed or explicit width of the column), Columns must be contained in a Row. 

## Terms:

- RTL = right-to-left layout (Hebrew/Arabic)
- LTR = "normal" left-to-right layout

## Props

`aspectRatio` (see Introduction)

`size` may be supplied as prop to Column. Possible values is 0 to Infinity. This number defines the width of the column is as a percentage of its parent view's computed or explicitly set width. It defaults to content width (or no width.) Since `size` accepts any number from 0 to Infinity (or horizontal scroll limit), you can make the column as wide as you want. 

`sm`, `md`, `lg` and `xl` are device-dependent 'size' values that are applied to columns.

`offset`, `smOffset`, `mdOffset`, `lgOffset` and `xlOffset` - may be applied to Column. Accepts any number. This number defines the marginLeft (or marginRight in csase of RTL mode) for the column as a percentage of its parent view's computed or explicitly set width. Offset values can also be negative. Default is 0. 

_Using offset values in RTL mode moves things from right to left. Using them in normal LTR mode moves things from left to right. It's pretty normal to expect that. If you're working in both directions, this makes offsets more useful than using marginLeft or marginRight directly._

`smHidden`, `mdHidden`, `lgHidden` and `xlHidden` - may be applied to Column. This tells the grid to hide certain columns based on the current width of the screen.  

`aspectRatio` maybe applied to Column. The grid computes the current aspect ratio of the device (which reverses with orientation) and based on that excludes from display any columns that have an `aspectRatio` prop that has a different aspect ratio. If no `aspectRatio` is supplied the column will be displayed at all aspect ratios.

`vAlign` may be supplied as prop to Column to vertically align the elements and/or rows within it. Possible values are: middle, top, bottom, space and distribute. Default is top.

`vAlign` may also be supplied as prop to Row to align the columns within it in the vertical direction. Possible values are: top, middle, bottom and stretch. Default is top.

`hAlign` may be supplied as prop to Row to align the columns within it in the horizontal direction. Possible values are: center, left, right, space and distribute. Default is left.

`hAlign` may also be supplied as prop to Column to align its rows and/or elements within it in the horizontal direction. Possible values are: center, left, right, and stretch. Default is left.

`rtl` may be supplied as prop to Row to both reverse the order of columns (or elements) inside a row as well as to set alignX to 'right.' This is useful for Hebrew and Arabic layouts. 

`fullHeight` may be supplied as prop to Row. It sets the the row's height to 100% of the computed or explicitly height of its parent view. 

`fullWidth` may be supplied as prop to Column. It sets the the column's width to 100% of the computed or explicitly set width of its parent view. 

`wrap` may be supplied as prop to Row to wrap any content that is fully beyond the width of the row's computed or explicitly set width. 

`alignLines` may be supplied as prop to Row to vertically align the wrapped lines within the Row (not to be confused with the items that are inside each line.) Possible values are: top, middle, bottom, space, distribute, stretch. (See section on Aligning Wrapped Lines within Rows)

These make up the basic rules. As you can see the number of rules is far fewer than with bare-bone Flex. This makes it a much simpler task to create sophisticated dynamic layout behavior (fewer knobs and switches.) 

## Usage

There are five 'size' props for `Column` that determine its width as a percentage. The values are indicated by `size`, `sm`, `md`, `lg` and `xl`. The first one, `size`, applies to all screen sizes. The others apply to screen widths of 0-480, 768-1023, 1024-1365, and 1366 and larger, respectively. 

There are five 'offset' props for `Column` that determine it's offset as a percentage (from left in case of LTR and from right in case of RTL.) The values are indicated by `offset`, `smOffset`, `mdOffset`, `lgOffset` and `xlOffset`. The first one, `offset`, applies to all screen sizes. The others apply to screen widths of 0-480, 768-1023, 1024-1365, and 1366 and larger, respectively. Unlike size values, offset values can be positive _or_ negative.

There are four 'hidden' props for `Column` that determine whether the column is displayed or not at the given screen size. This is indicated by `smHidden`, `mdHidden`, `lgHidden` and `xlHidden`.  They apply to screen widths of 0-480, 768-1023, 1024-1365, and 1366 and larger, respectively.

The size-specific _size_ props (sm, md, lg, and xl), the size-specific _offset_ props (smOffset, mdOffset, lgOffset and xlOffset) and the size-specific _hidden_ props (smHidden, mdHidden, lgHidden, xlHidden) props refer to the effective screen width, which changes with orientation. 

The following are the screen width thresholds for these props:

- sm: <= 480px 
- md: > 480 and < 1024
- lg: >= 1024 and < 1366
- xl: >= 1366 

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

<img src="https://s2.postimg.org/im8oxf195/Screen_Shot_2017-04-17_at_2.59.31_PM.png" width=480>

_

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

<img src="https://s18.postimg.org/gr89vaghl/Screen_Shot_2017-04-07_at_6.47.22_PM.png" width=480>

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

## Aligning Wrapped Lines within Rows

By default, content in rows will extend beyond the width of the screen if the sum of the width values of the content is larger than 100% of the row's width. To wrap columns or any content within the row the content must be plural (i.e. not one really wide column as a single item won't wrap) and the Row must have the 'wrap' prop supplied. When rows are allowed to wrap what happens is the row will then contain multiple horizontal "lines" that hold the items within it. The lines themselves (as opposed to the items within them) may be aligned in the vertical direction using alignLines prop (see Props section above for details) 

Here are two screens illustrating the effect of wrap, vAlign and alignLines. The first tells the row that it can turn into a multi-line row that wraps the items. The second tells it how to vertically align the items. The third tells it how to vertically align the wrapped lines that contain the items. 

Markup #1:
```
    <Row wrap vAlign='top' alignLines='stretch' style={{height: 100, backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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
```
    <Row wrap vAlign='bottom' alignLines='stretch' style={{height: 100, backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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

## Another Real-World Example

<img src="https://s8.postimg.org/7t9wefrrp/Screen_Shot_2017-04-17_at_2.59.00_PM.png" width=480>

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