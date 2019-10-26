

[![NPM](https://nodei.co/npm/react-native-responsive-grid.png?compact=false)](https://npmjs.org/package/react-native-responsive-grid)

[![Backers on Open Collective](https://opencollective.com/react-native-responsive-grid/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/react-native-responsive-grid/sponsors/badge.svg)](#sponsors)

# React Native Library for Responsive and Universal Apps

### Pending Proposals

All issues that are not bugs are appropriately labeled and closed.

For now we have three kinds of non-bug issues that are open:

- [Pending Proposals](https://github.com/idibidiart/react-native-responsive-grid/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aproposal+label%3Apending)

- [Pending Questions](https://github.com/idibidiart/react-native-responsive-grid/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aquestion+label%3Apending)


### Install

In your project folder, `yarn add react-native-responsive-grid`

*For best results, use React Native 0.50 or later 

## Predictable Responsive Layout

This grid is based on row and column components that can be nested in an alternating pattern to build a responsive and adaptive 'tree of Views' of any shape and depth. It eschews complicated Flexbox-based size constraints in favor of simple percentage-based size constraints. And it does so while using Flexbox-based vertical and horizontal alignment constraints. 

A Column may contain one or more Rows, each of which may contain one or more Columns, each of which may contain one or more Rows, and so on. Both Rows and Columns can be styled using predictable, percentage-based dimensions and, in case of Columns, percentage-based horizontal `offset`.

Rows can be aligned inside Columns, vertically (along main axis,) and aligned and stretched horizontally (along cross axis.) Columns can be aligned inside Rows, horizontally (along main axis), and and aligned and stretched vertically (along cross axis.) Additionally, the lines created within a Row that wraps may be aligned and stretched vertically relative to a parent Column. 

With these basic features, we can build the entire UI component tree (or an individual component's subtree) as a consistent, repeatable and recursive pattern, one that has predictable and dynamic --not only static-- responsiveness and the ability to trigger specific adaptive behavior. 

_When To Use Flexbox Sizing:_ 

_In some cases when having an absolutely sized view followed (vertically or horizontally) by a view that must take up the remaining space, we'll need to use a wrapping grid element -- Column (to wrap vertical layout) or Row (to wrap horizontal layout) -- with style={{flex: 1}} and same on the Flex sized element that it wraps along with the absolutely sized element. However, such mixing of absolute and Flex sizing is not recommended as it won't lead to a fully responsive UI layout._

_The only other reason to use Flexbox grow/shrink sizing with this Grid is for grow-and-shrink-in-place UI (aka "squishy" UI) where elements shrink and grow in elastic fashion and relative to each other instead of undergoing dynamic layout change and/or staying in proportion to screen width._ 

## Examples

You may use this grid to build responsive 2D layouts that maintain their relative proportions, change their basic structure in a predictable way and dynamically decide what content to display, based on screen size, aspect ratio, and orientation.  

## [Example 1: Universal, Responsive Pinterest Layout](https://www.youtube.com/watch?v=QyIRoKinyLU)
[![>> universal pinterest layout <<](https://img.youtube.com/vi/QyIRoKinyLU/0.jpg)](https://www.youtube.com/watch?v=QyIRoKinyLU)

## [Example 2: Reponsive Tiles for Universal Apps](https://www.youtube.com/watch?v=OPUKz9wQ1Ks)
[![>> universal tiles demo <<](https://img.youtube.com/vi/OPUKz9wQ1Ks/0.jpg)](https://www.youtube.com/watch?v=OPUKz9wQ1Ks)

## [Example 3: Selecting an image with the right aspect ratio](https://www.youtube.com/watch?v=Nghqc5QFln8)
[![>> aspectRatio demo <<](https://img.youtube.com/vi/Nghqc5QFln8/0.jpg)](https://www.youtube.com/watch?v=Nghqc5QFln8)

## [Example 4: Responsive Break Points (Row Wrapping)](https://www.youtube.com/watch?v=GZ1uxWEVAuQ) 
[![>> responsive break points demo <<](https://img.youtube.com/vi/GZ1uxWEVAuQ/0.jpg)](https://www.youtube.com/watch?v=GZ1uxWEVAuQ)

## [Example 5: FlatList + Row & Column Wrapping](https://www.youtube.com/watch?v=qLqxat3wX_8)
[![>> FlatList Demo <<](https://img.youtube.com/vi/qLqxat3wX_8/0.jpg)](https://www.youtube.com/watch?v=qLqxat3wX_8)

The demos in the videos above show some of the possibilities, but this grid is capable of more complex responsive and adaptive behavior.

### Example 1: Universal, Responsive Pinterest Layout

This examples showcases 2-dimensional Constraint-Based Layout using a custom layout in a few lines of code. Flexbox fails us here in that it does not support a 2-dimensional constraint layout. This is precisely why React Native needs native support for display:'grid' Until then you may use this grid with your own constraint-based layout. This example shows a simplified Pinterest-like layout. You may extend it to build a masonry effect using a box packing algorithm and Flexbox's 1-dimensional constraint-based elastic layout. One thing this grid is not designed to do is to implement transitions but it can be forked and extended to do that (would happy take a PR.) 

[Source Code for Example 1](https://github.com/idibidiart/react-native-responsive-grid/blob/master/UniversalPinterestLayout.md)

### Example 2: Reponsive Tiles for Universal Apps

This examples showcases the grid's 1-dimensional Constraint-Based Layout using Flexbox wrapping behavior. 

The problem it solves is how to make a tiled screen layout that looks consistent across all screen sizes and aspect ratios, It involves the following:

1. How to size tiles such that they change size relative to the size of the screen *as well as* retain their shape (width/height aspect ratio)

2. How do we hide/show tiles on demand and fill the void left by hidden tiles.

The goal is how to do the above in an elegant and declarative way that allows the average user to work without all the tedious implementation details of doing it in row Flexbox and JS. 

_This example also showes how to use alignLines='stretch' for wrapped row content to have the wrapped lines fill the whole screen. It's the right way to partition a Row vertically in 1/n tall lines where n is the number of wrapping-stacked fullWidth columns._ 

[Source Code for Example 2](https://github.com/idibidiart/react-native-responsive-grid/blob/master/UniversalTiles.md)

### Example 3: Selecting an image with the right aspect ratio

In this demo, the grid picks the image with the **closest aspect ratio** to the device aspect ratio, dynamically, taking into account the current device orientation. The images themselves must be sized and cropped by the designer so that they match the common device aspect ratios (see below) while also showing the part of the image that the designer intends to show for each aspect ratio. Since there could be many aspect ratios that correspond to different devices we should have multiple such images (and, optionally, their rotated versions.)

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

```jsx
<Grid>{(state, setState) => (
    <Row fullHeight aspectRatio={{ratio: '3:2', orientation: "portrait"}}>
        <Image source={require('./assets/homepage hero-3-2-portrait.jpg')} style={styles.homeImage}></Image>
    </Row>

    <Row fullHeight aspectRatio={{ratio: '3:2', orientation: "landscape"}}>
        <Image source={require('./assets/homepage hero-3-2-landscape.jpg')} style={styles.homeImage}></Image>
    </Row>

    <Row fullHeight aspectRatio={{ratio: '16:9', orientation: "portrait"}}>
        <Image source={require('./assets/homepage hero-16-9-portrait.jpg')} style={styles.homeImage}></Image>
    </Row>

    <Row fullHeight aspectRatio={{ratio: '16:9', orientation: "landscape"}}>
        <Image source={require('./assets/homepage hero-16-9-landscape.jpg')} style={styles.homeImage}></Image>
    </Row>
  )}
</Grid>
```

### Example 4: Responsive Break Points (Row Wrapping)

A more basic example of he grid's 1-Dimensional Constraint-Based Layout using Flexbox.

In the second demo, the grid folds columns in rows based on the screen-device-depebdent `xxSize` prop provided on the column (which can be percentage based, e.g. smSize, or point based, e.g. smSizePoints. This means that different break points can be supplied for the different screen sizes in both absolute and relative terms. This example demonstrates how to get Row content (e.g. child Columns) to wrap at certain break points (which can be supplied per screen width)

The following are the preset screen widths (in points) at which breaks maybe specified (where row wraps columns within it into new horozintal lines):

  - SMALL_Width: 375 (0-375)
  - MEDIUM_Width: 767 (376-767)
  - LARGE_Width: 1023 (768-1023)
  - XLARGE_Width: 1024+

  - SMALL_Height: 667 (0-667)
  - MEDIUM_Height: 1023 (668-1023)
  - LARGE_Height: 1365 (1024-1365)
  - XLARGE_Height: 1366+

The preset values may be overridden with `setBreakPoints` which merges the parameter object with the defaults.  Each cutoff specifies the upper end for that range.  `XLARGE_Width` is inferred from anything above `LARGE_Width`. BreakPoints should be set early in the app such as in `index.js`.  An example overriding the `SMALL_Width`, `MEDIUM_Width`, and `LARGE_Width` break points:
```
import { setBreakPoints } from 'react-native-responsive-grid';

setBreakPoints({
  SMALL_Width: 414,
  MEDIUM_Width: 600,
  LARGE_Width: 1024
})
```

```jsx
  <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={80} offset={6}>
        <Row>
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
```

### Example 5: FlatList + Row & Column Wrapping

FlatList is a virtualized replacement for React Native's old ListView component. Using FlatList as a container is supported by this grid. This example also demonstrate wrapping Column content based on screen size. See ('size' prop under the [Props](https://github.com/idibidiart/react-native-responsive-grid#props) section.) It also demonstrates who to wrap Row content (e.g. child columns) based on screen size (also see [Example 4](https://github.com/idibidiart/react-native-responsive-grid#example-4))

```jsx
import React, { Component } from 'react';
import {
  FlatList,
  Text,
  ScrollView
} from 'react-native';

import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import { MaterialIcons } from '@expo/vector-icons';
import faker from 'faker';

let j = 0
const randomUsers = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      key: faker.random.uuid(),
      date: faker.date.weekday(),
      name: faker.name.firstName(),
      job: faker.name.jobTitle(),
      index: j++
    })
  }
  return arr
}

export default class Home extends Component {
  state = {
    refreshing: false,
    data: randomUsers(10),
  };

  onEndReached = () => {
    const data = [
        ...this.state.data,
        ...randomUsers(10),
      ]

    this.setState(state => ({
      data
    }));
  };

  onRefresh = () => {
    this.setState({
      data: randomUsers(10),
    });
  }

  render() {
    return (
        <FlatList
          data={this.state.data}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          renderItem={
            ({ item }) => {
              return (
                <Row key={item.key} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
                  <Col size={80} offset={6} >
                    <Row>
                      <Col size={60} smSize={100}>
                        <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>{String(item.date)}</Text>
                        <Row>
                          <Col size={10}>
                            <MaterialIcons name='person' size={17} color='gray'/>
                          </Col>
                          <Col smSize={60} size={87.5} offset={2.5}>
                            <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>{item.job}</Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col size={40} smSize={100}>
                        <Text style={{fontSize: 16, color: '#0a0a0a'}}>{item.name}</Text>
                      </Col> 
                    </Row>    
                  </Col>
                  <Col size={8} offset={-6} hAlign='right'>
                        <Text>{item.index}</Text>
                  </Col>
                </Row>
              )
            }}
        />
    )
  }
}
```

## Components

- Row: Flexbox View with flexDirection set to 'row' with convenient props and dynamic behavior. 

- Col: Flexbox View with flexDirection set to 'column' with convenient props and dynamic behavior.

- Grid: an optional, stateful, component with style={{flex: 1}}. The Grid uses the children-as-funnction pattern and passes its state to its children, and allows state to be declared in its props, which will have the latest screen and grid info after orientation changes. It also passes it's render-triggering async setState method to its children. 

**Important:**

**Grid component is required if you need to re-run the render() function in response to orientation change (many examples here)** 

**Grid component is also required if you use aspectRatio prop on Rows or Columns since the selection of content of the closest aspect ratio requires re-running the render function after orientation change.**

Below is an example:

```jsx 
export const Home = () => (
  <Grid state={
    {
      someState: 'yyz', 
      anotherState: 'abc'
    }}>
  {({state, setState}) => (
       {/*  possibly other JSX here */}
        <Col fullWidth style={{backgroundColor: 'lightgray'}}> 
          <ScrollView removeClippedSubviews={true} >
            <Row fullHeight>
              {layout(state)}
            </Row>
          </ScrollView>
        </Col>
      )}
  </Grid>)
```

## Utils

import { Row, Column as Col, ScreenInfo, Grid} from './grid'

`ScreenInfo()` This will return the following data:

```js
{
  mediaSize: mediaSizeWidth,
  mediaSizeWidth,
  mediaSizeHeight, 
  width: SCREEN_WIDTH, 
  height: SCREEN_HEIGHT, 
  aspectRatio: {currentNearestRatio, currentOrientation}
}
``` 

- mediaSize is one of `sm`, `md`, `lg`, `xl` screen width categories and is aliased to mediaSizeWidth
- mediaSizeHeight is the same but for screen height. It's used for hiding/showing Rows wit `hidden` prop based on screen height category and for Row `size` props.  

if `sizeOnly` is true it will drop aspectRatio and its 'nearest match' calculation (shaves a few ms)

## Methods

Row and Column both have `.hide()` and `.show()` instance methods. The instance reference you get from a ref callback will have these methods. See Example #1 for usage.

## Instance Variables

These are provided mainly for unit tests, except for componentInstance`.hidden` and componentInstance`.shown` which can be used to tell the state of the component.

## Props

All props are case sensitive.

`aspectRatio` (see [Example 3](https://github.com/idibidiart/react-native-responsive-grid#example-3))

`size` may be supplied as prop to Column (width) or Row (height). This number defines the width of the column or height of a row as a percentage of its parent view's computed or explicit width or height, respectively.  

`smSize`, `mdSize`, `lgSize` and `xlSize` are device-dependent size values that are applied to Columns (which map to width percent) and Rows (which map to height percent.) In addition to their utility in deciding the size of content based on screen size (width in case of Columns and height in case of Rows), they may are also used for defining column wrapping behavior based on screen size. For example, Columns in as Row will wrap if Row width becomes smaller at smaller screen sizes.

`sizePoints` may be supplied as prop to Column (which map to width points) or Row (which map to height points). This number defines the width of the column or height of a row as an asolute value in points.

`smSizePoints`, `mdSizePoints`, `lgSizePoints`, and `xlSizePoints` are like their percentage-based equivalents but use point values. 

`offset` may be applied to Column. This number defines the marginLeft (or marginRight in csase of RTL mode) for the column as a percentage of its parent view's computed or explicitly set width. Offset values can also be negative. Default is 0. 

`smOffset`, `mdOffset`, `lgOffset` and `xlOffset` are device-dependent offset values that are applied to columns.

`offsetPoints`, `mdOffsetPoints`, `lgOffsetPoints`, and `xlOffsetPoints` are like their percentage-based equivalents (i.e. applied to Column to produce offset) but use value in points instead of value in percent. 

_Using offset values in RTL mode moves things from right to left. Using them in normal LTR mode moves things from left to right. It's pretty normal to expect that. If you're working in both directions, this makes offsets more useful than using marginLeft or marginRight directly._

_Specifying an offset value in normal LTR mode means marginLeft (if specified in style prop) will be overwritten by offset value. However, marginRight (if specified in style prop) will not be overwritten by the offset value. Specifying offset value in RTL mode means marginRight (if specified in style prop) will be overwritten by offset value. However, marginLeft (if specified in style prop) will not be overwritten by offset value._

`smHidden`, `mdHidden`, `lgHidden` and `xlHidden` - may be applied to Column or Row which tells the parent Row or Column, respectively, to hide the affected child Column or child Row based on the current width (for child Columns) or height (for child Rows) of the screen.  

The screen-size-specific _size_ and _hidden_ props refer to the current screen width in case of Columns and current screen height in case of Rows, which changes with orientation. The _offset_ props only apply to Columns so they refer to the current screen width. 

The following are the device width (for Columns) and height (for Rows) thresholds for these props:

The preset values may be overridden with `setBreakPoints` which merges the parameter object with the defaults.  Each cutoff specifies the upper end for that range.  `XLARGE_Width` is inferred from anything above `LARGE_Width`. BreakPoints should be set early in the app such as in `index.js`.  An example overriding the `SMALL_Width`, `MEDIUM_Width`, and `LARGE_Width` break points:
```
import { setBreakPoints } from 'react-native-responsive-grid';

setBreakPoints({
  SMALL_Width: 414,
  MEDIUM_Width: 600,
  LARGE_Width: 1024
})
```

`vAlign` may be supplied as prop to Column to vertically align the elements and/or rows within it. Possible values are: `middle` | `center`, `top`, `bottom`, `space` and `distribute`. Default is top.

`vAlign` may also be supplied as prop to Row to align the columns within it in the vertical direction. Possible values are: `top`, `middle` | `center`, `bottom`, `baseline` and `stretch`. Default is `stretch`.

`hAlign` may be supplied as prop to Row to align its child Columns and/or elements within it in the horizontal direction. Possible values are: `center` | `middle`, `left`, `right`, `space` and `distribute`. Default is left.

`hAlign` may also be supplied as prop to Column to align its child Rows and/or elements within it in the horizontal direction. Possible values are: `center` | `middle`, `left`, `right`, and `stretch`. Default is `stretch`.

`rtl` may be supplied as prop to Row to both reverse the order of columns (or elements) inside a row as well as to set hAlign to 'right.' This is useful for right-to-left layouts. 

`fullHeight` may be supplied as prop to Row in place of size={100} or style={{height: '100%'}}  -- note that Rows have 0 height and width by default, but a fullHeight Row inside of a fullWidth Column will have height and width of 100% 

`fullWidth` may be supplied as prop to Column in place of size={100} or style={{width: '100%'}} -- note that Columns have 0 height and width by default, but a fullWidth Column inside of a fullHeight Row will have height and width of 100%

`alignLines` may be supplied as prop to Row to vertically align the wrapped lines within the Row (not to be confused with the items that are inside each line.) Possible values are: top, middle, bottom, space, distribute, stretch. (See section on Aligning Wrapped Lines within Rows)

`alignSelf` maybe supplied as prop to Row to override the hAlign prop of the parent Column for that Row.
Possible values are: `auto`, `left`, `right`, `center` | `middle`, `stretch`

`alignSelf` maybe supplied as prop to Column to override the vAlign prop of the parent Row for that Column.
Possible values are: `auto`, `top`, `bottom`, `middle` | `center`, `stretch`, `baseline`

`noWrap` may be supplied as prop to Row prevent child elements from wrapping. 

### Nesting

If you're nesting a column inside a row which is inside another column that is inside another row as below:

```jsx
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

### RTL Support

This is intended for right-to-left (RTL) layouts and apps that have their text in any of the following languages: 

- Arabic
- Aramaic
- Azeri
- Dhivehi/Maldivian
- Hebrew
- Kurdish (Sorani)
- Persian/Farsi
- Urdu

Notice the reversed order of the Text relative to the physical order in the markup. Also notice that columns are justified as flex-end within the row and their content is rightAligned (except for the second column which is explicitly leftAligned to mimic the rightAligned behavior in normal ltr layout)

<img src="https://s18.postimg.org/gr89vaghl/Screen_Shot_2017-04-07_at_6.47.22_PM.png" width=480>

### Normal LTR Markup 

```jsx
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

```jsx
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

### Utils

You may import ScreenInfo from grid and invoke inside of render() of your component to get current screen diemsnions and orientation. 

### Predictable, Dynamic Layout Behavior

Being able to readt to layout changes, including changes due to device rotation (for apps that allow it), is a key aspect of responsive design. This grid is designed to enable dynamic response to layout changes (see the demos at the start of this Readme)

Columns and Rows have `position: 'relative'` by default to keep them within the layout flow, but they can have `position: 'absolute'` specified in style prop, for overlays and such. 

The Grid component is a stateful top-level component (at root, above ScrollView, ListView, FlatList et al but below a Modal and Drawer) Grid should not be inside another Grid and it is only needed if you wish to respond to orientation and layout changes by re-running the render() function. It uses the children-as-funnction pattern to pass its state, including its dimensions and any user-defined state, along with screen dimensions, to its children. The user may define Grid state in its props. The Grid also passes it's async render-causing setState method to its children.

## More Examples

```jsx
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col smSize={50} mdSize={33.333} lgSize={25}>
        <Text>First Column</Text>
    </Col>
</Row>
```

In the example above, on a phone in portrait mode, the Column would take up 50% of the row's computed width. On a phone in landscape nmode or a normal tablet the Column would take up 33.333% of the row's width. On a big tablet the Column would take up 25% of the row's width.

```jsx
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row style={{height: 20}}>
  <Col smOffset={0} mdOffset={10} lgOffset={20} xlOffset={40}>
    <Text>test</Text>
  </Col>
</Row>
```

In the example above, the text "test" will move further to the right with larger screen sizes.

```jsx
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

## More Examples

- [Responsive Layout](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#responsive-layout)
- [Custom Components](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#custom-components)
- [Wrapped Alignment](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#wrapped-alignment)

## History

Before React Native v0.42 we didn't have a performant, declarative way of specifying percentage-based dimensions. Then came React Native v0.42 which gave us that ability. Since then several open source contributors have made responsive grids that take advantage of this new capability. This "grid" takes one of the simplest and most well-thought-out ones, namely, `react-native-flexbox-grid` (by @rundmt), and modifies it heavily to produce a simple yet powerful layout model that we can use to implement responsive and adaptive behavior. 

# Gridism

## _When I first made a grid I happened to be thinking of the innocence of trees and then this grid came into my mind and I thought it represented innocence, and I still do, and so I painted it and then I was satisfied. I thought, this is my vision._ --[Agnes Martin](https://www.guggenheim.org/arts-curriculum/topic/grids)


## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="https://github.com/idibidiart/react-native-responsive-grid/graphs/contributors"><img src="https://opencollective.com/react-native-responsive-grid/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/react-native-responsive-grid#backer)]

<a href="https://opencollective.com/react-native-responsive-grid#backers" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/react-native-responsive-grid#sponsor)]

<a href="https://opencollective.com/react-native-responsive-grid/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/1/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/2/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/3/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/4/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/5/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/6/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/7/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/8/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/react-native-responsive-grid/sponsor/9/website" target="_blank"><img src="https://opencollective.com/react-native-responsive-grid/sponsor/9/avatar.svg"></a>


