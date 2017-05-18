
# Responsive, Adaptive, and Declarative Layout for React Native 

### Install

In your project folder, `yarn add react-native-responsive-grid`

*requires React Native 0.43.x or newer 

## Background

Priot to React Native v0.42 we had no performant and declarative way for specifying percentage-based style values, and we had to do that in the layout event handler, i.e. post layout, which introduced unnecessary imperative logic and sluggishness. Then came React Native v0.42 with built-in support for percentage-based style values. Since then several open source contributors have made responsive grids that take advantage of this new capability. I've taken one of the simplest and most well-thought-out ones, namely, `react-native-flexbox-grid` (by @rundmt), and made some significabnt changes and enhancements to it that have resulted in a simple and powerful layout model with predictable dynamic behavior. 

## Design TL;DR

This grid eschews Flexbox-based sizing in favor of percentage-based sizing while at the sane time relying on Flexbox for alignment. It delivers the predictability of the percentage-based model with the more sophisticated alignment capasbility of the Flexbox model.

(for more details see [Design Principles](https://github.com/idibidiart/react-native-responsive-grid/blob/master/DesignPrinciples.md))

## Examples

You may use this grid to build responsive 2D layouts that maintain their relative proportions, change their basic structure in a predictable way and dynamically decide what content to display, based on screen size, aspect ratio, and orientation.  

## [Example 1: aspectRatio](https://www.youtube.com/watch?v=Nghqc5QFln8)
[![>> aspectRatio demo <<](https://img.youtube.com/vi/Nghqc5QFln8/0.jpg)](https://www.youtube.com/watch?v=Nghqc5QFln8)

## [Example 2: breakPoints](https://www.youtube.com/watch?v=GZ1uxWEVAuQ) 
[![>> responsive break points demo <<](https://img.youtube.com/vi/GZ1uxWEVAuQ/0.jpg)](https://www.youtube.com/watch?v=GZ1uxWEVAuQ)

## [Example 3: layoutEvent](https://www.youtube.com/watch?v=99J3c_Zn6QU) 
[![>> layoutEvent demo <<](https://img.youtube.com/vi/99J3c_Zn6QU/0.jpg)](https://www.youtube.com/watch?v=99J3c_Zn6QU)

## [Example 4: FlatList](https://www.youtube.com/watch?v=qLqxat3wX_8)
[![>> FlatList Demo <<](https://img.youtube.com/vi/qLqxat3wX_8/0.jpg)](https://www.youtube.com/watch?v=qLqxat3wX_8)

The demos in the videos above show some of the possibilities, but this grid is capable of more complex responsive and adaptive behavior.

### Example 1

In the first demo, the grid picks the image with the **closest aspect ratio** to the device aspect ratio, dynamically, taking into account the current device orientation. The images themselves must be cropped by the designer so that they match the common device aspect ratios (see below) while also showing the part of the image that the designer intends to show for each aspect ratio. Since there could be many aspect ratios that correspond to different devices we should have multiple such images (and, optionally, their rotated versions.)

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

### Example 2

In the second demo, the grid folds columns in a row that has been tagged with 'wrap' prop using the, using the screen-device-depebdent `breakPoints` prop on the column. This means that different break points can be supplied for the different screen sizes. 

The following are the screen width thresholds:

- sm: <= 480px 
- md: > 480 and < 1024
- lg: >= 1024 and < 1366
- xl: >= 1366 

```
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
```

### Example 3

In the third demo, the grid normally propagates React Native's layout event from Rows as a generic event that is subscribed to by all Rows which causes all Rows and their child Columns to re-render whenever any Row experiences layout change. If 'layoutEvent' is supplied as a prop on a Row with a user-supplied event name the Row will only propagate the event (rather than re-render) and it will not cause it other Rows to re-render. This is useful when we wish to react to layout change on per-row basis. The example below shows how we may listen and react to such specific layout events in components that use the grid.


```
  import React, { Component} from 'react'
  import {
      View,
      Text,
      DeviceEventEmitter
  } from 'react-native'

  import { Row, Column as Col} from './grid'

  export default class Home extends React.Component {
    constructor (props) {
      super(props)
      this.sub = null
    }

    static route = {
        navigationBar: {
          title: 'Home',
          renderTitle: "Layout Event Demo",
          backgroundColor: "#fff"
        }
      }

    componentWillMount() {
      this.sub = DeviceEventEmitter.addListener("someEventKey", (e) => {

        this.setState({someEventKey: e})
      })

    }

    componentWillUnmount() {
      this.sub.remove()
    }

    contentReady = () => {
              if (this.state && this.state.someEventKey) {
                return (
                    <Col fullWidth hAlign='center'>
                      <Row>
                        <Text style={{fontSize: 20}}>screen width: {this.state.someEventKey.screenInfo.width}</Text>
                      </Row>
                      <Row>
                        <Text style={{fontSize: 20}}>screen height: {this.state.someEventKey.screenInfo.height}</Text>
                      </Row>
                      <Row>
                        <Text style={{fontSize: 20}}>orientation: {this.state.someEventKey.screenInfo.aspectRatio.currentOrientation}</Text>
                      </Row>
                      <Row>
                        <Text style={{fontSize: 20}}>aspect ratio: {this.state.someEventKey.screenInfo.aspectRatio.currentNearestRatio}</Text>
                      </Row>
                      <Row>
                        <Text style={{fontSize: 20}}>element width: {this.state.someEventKey.rowInfo.width}</Text>
                      </Row>
                      <Row>
                        <Text style={{fontSize: 20}}>element height: {this.state.someEventKey.rowInfo.height}</Text>
                      </Row>
                      <Row>
                        <Text style={{fontSize: 20}}>element x: {this.state.someEventKey.rowInfo.x}</Text>
                      </Row>
                      <Row>
                        <Text style={{fontSize: 20}}>element y: {this.state.someEventKey.rowInfo.y}</Text>
                      </Row>
                    </Col>)
              } else {
                return null
              }
    }

    render() {
      return (
        <Row fullHeight fullWidth vAlign='middle' hAlign='center' style={{backgroundColor: 'orange'}}>
          <Col size={50} style={{backgroundColor: 'pink', padding: '0%'}}>
            <Row layoutEvent="someEventKey"  style={{backgroundColor: 'yellow'}}> 
              {this.contentReady()}
            </Row>
          </Col>
        </Row>)
    }
  }
``` 

### Example 4

FlatList is a virtualized replacement for React Native's old ListView component. Using FlatList as a container is supported by this grid. 

```
import React, { Component } from 'react';
import {
  FlatList,
  Text,
  ScrollView
} from 'react-native';

import { Row, Column as Col} from './grid'

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
    refreshing: true,
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
      <ScrollView>
        <FlatList
          data={this.state.data}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          renderItem={({ item }) => {
            return (
                <Row key={item.key} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
                    <Col size={80} offset={6} >

                      <Row wrap>
                        <Col size={60} breakPoints={{sm: 200}}>
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
                        <Col size={40} breakPoints={{sm: 200}}>
                          <Text style={{fontSize: 16, color: '#0a0a0a'}}>{item.name}</Text>
                        </Col> 
                     
                      </Row>    

                    </Col>
                    <Col size={14} offset={-6} hAlign='right'>
                          <Text>{item.index}</Text>
                    </Col>
                </Row>
            );
          }}
        />
      </ScrollView>
    );
  }
}
```


## Props

All props are case sensitive.

`aspectRatio` (see [Example 1](https://github.com/idibidiart/react-native-responsive-grid#example-1))

`breakPoints` (see [Example 2](https://github.com/idibidiart/react-native-responsive-grid#example-2))

`layoutEvent` (see [Example 3](https://github.com/idibidiart/react-native-responsive-grid#example-3))

`size` may be supplied as prop to Column. Possible values is 0 to Infinity. This number defines the width of the column is as a percentage of its parent view's computed or explicitly set width. It defaults to content width (or no width.) Since `size` accepts any number from 0 to Infinity (or horizontal scroll limit), you can make the column as wide as you want. 

`smSize`, `mdSize`, `lgSize` and `xlSize` are device-dependent size values that are applied to columns.

`offset` may be applied to Column. Accepts any number. This number defines the marginLeft (or marginRight in csase of RTL mode) for the column as a percentage of its parent view's computed or explicitly set width. Offset values can also be negative. Default is 0. 

`smOffset`, `mdOffset`, `lgOffset` and `xlOffset` are device-dependent offset values that are applied to columns.

_Using offset values in RTL mode moves things from right to left. Using them in normal LTR mode moves things from left to right. It's pretty normal to expect that. If you're working in both directions, this makes offsets more useful than using marginLeft or marginRight directly._

`smHidden`, `mdHidden`, `lgHidden` and `xlHidden` - may be applied to Column. This tells the grid to hide certain columns based on the current width of the screen.  

`vAlign` may be supplied as prop to Column to vertically align the elements and/or rows within it. Possible values are: middle, top, bottom, space and distribute. Default is top.

`vAlign` may also be supplied as prop to Row to align the columns within it in the vertical direction. Possible values are: top, middle, bottom and stretch. Default is top.

`hAlign` may be supplied as prop to Row to align the columns within it in the horizontal direction. Possible values are: center, left, right, space and distribute. Default is left.

`hAlign` may also be supplied as prop to Column to align its rows and/or elements within it in the horizontal direction. Possible values are: center, left, right, and stretch. Default is left.

`rtl` may be supplied as prop to Row to both reverse the order of columns (or elements) inside a row as well as to set hAlign to 'right.' This is useful for right-to-left layouts. 

`fullHeight` may be supplied as prop to Row or Column. It sets the the height to 100% of the computed or explicitly height of its parent view. 

`fullWidth` may be supplied as prop to Row or Column. It sets the the width to 100% of the computed or explicitly set width of its parent view. 

`wrap` may be supplied as prop to Row to wrap any child element that is otherwise rendered fully outside of the width of the row's computed or explicitly set width. 

`alignLines` may be supplied as prop to Row to vertically align the wrapped lines within the Row (not to be confused with the items that are inside each line.) Possible values are: top, middle, bottom, space, distribute, stretch. (See section on Aligning Wrapped Lines within Rows)

The screen-size-specific _size_ props (smSize, mdSize, lgSize, and xlSize), the screen-size-specific _offset_ props (smOffset, mdOffset, lgOffset and xlOffset) and the screen-size-specific _hidden_ props (smHidden, mdHidden, lgHidden, xlHidden) props refer to the effective screen width, which changes with orientation. 

The following are the screen width thresholds for these props:

- sm: <= 480px 
- md: > 480 and < 1024
- lg: >= 1024 and < 1366
- xl: >= 1366 

### Nesting

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

## More Examples

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col smSize={50} mdSize={33.333} lgSize={25}>
        <Text>First Column</Text>
    </Col>
</Row>
```

In the example abovw, on a phone in portrait mode, the Column would take up 50% of the row's computed width. On a phone in landscape nmode or a normal tablet the Column would take up 33.333% of the row's width. On a big tablet the Column would take up 25% of the row's width.

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

## Even More Examples

- [Responsive Layout](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#responsive-layout)
- [Custom Components](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#custom-components)
- [Wrapped Alignment](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#wrapped-alignment)

