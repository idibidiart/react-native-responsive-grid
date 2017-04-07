
# React Native responsive grid based on react-native-flexbox-grid with several enhancements/mods and extended docs

## Row

```
import {Row} from 'react-native-responsive-grid';

<Row>
    <Text>My First Row</Text>
</Row>
```

`Row` is a component designed to represent a row. It utilizes `flex-direction: 'row'` to place it's children in rows. Typically we would put a `Column` inside of a `Row`, but it is not necessary. 

#### Mixed Static/Responsive Example

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row colPercent={5}>
    <Col size={5} offset={1}>
      <Text>
        First Column
      </Text>
    </Col>
    <Col sm={6} md={4} mdOffset={2} lg={3} lgOffset={3} >
      <Text>
        Second Column
      </Text>
    </Col>
</Row>
```

`colPercent` in row - Accepts a number from 0 to 100. This number defines the width of a single grid column as a percent of the row element's width.  If you do not specify a number or you specify 0 the `colPercent` will default to 8.333333 which results in 12 columns for the given row. See also Column Size and Offset. 

`size` in column - Accepts any positive number. This number defines how many grid columns wide the given layout column should be. If you do not specify a number or you input the number 0 the `size` will default to 8.333333 (1/12th the width of the row.) Since `size` accepts any number from 0 to Infinity, you can make your layout column as wide as you want, extending beyond the screen width if norwarp prop is set on the row. If nowrap is not set on the row, the column will wrap.  

sm, md, and lg are device-size-dependent 'size' values that are applicable to columns.

`offset` and `[size]Offset` - Accepts any number. This number defines the left offset in terms of the number of grid columns. Since grid columns are positioned at flex-start within the row (by design) offset values will snap to grid. Offset values can also be negative. 

**alignVertical** maybe supplied as prop to the row to vertically align the columns within the row. Possible values are: middle, top, bottom or fill.

**alignVertical** maybe also supplied as prop to the column to vertically align the items within the column. Possible values are: middle, top, bottom, space and distribute.

These are the basic rules from which potntially complex layout behavior can emerge. See also Column Size and Offset.

#### nowrap

```
import {Row} from 'react-native-responsive-grid';

//Will wrap Columns. Second Column's width will not protrude beyond row. It will wrap to the next Row.
<Row colPercent={5}>
    <Col size={6}>
      <Text>
        First Column
      </Text>
    </Col>
    <Col size={6}>
      <Text>
        Second Column Wrapped
      </Text>
    </Col>
</Row>

// Will not wrap Columns. Second Column's width will protrude beyond row in case of small (i.e. phone) screens since 60% + 60% = 120%
// 60% comes from colPercent * sm
<Row colPercent={10} nowrap>
    <Col sm={6} md={4} lg={3}>
      <Text>
        First Column
      </Text>
    </Col>
    <Col sm={6} md={4} lg={3}>
      <Text>
        Second Column
      </Text>
    </Col>
</Row>
```

`nowrap` - Accepts a boolean. This boolean defines the style property `flexWrap`. If no prop is specified, then the defaults value will be `flexWrap: 'wrap'`. If you add the prop to the `Row` then the style value will equal flexWrap: `nowrap`. 

## Column Size and Offset

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row colPercent={7}>
    <Col sm={6} md={4} lg={3} smOffset={1} mdOffset={3} lgOffset={5}>
        <Text>First Column</Text>
    </Col>
</Row>
```

There are currently four size props for `Column`. `size`, `sm`, `md`, and `lg`. The first one, `size`, applies to all screen sizes. The values indicate how many columns wide the column should be. The intrinsic column width is defined by percentage relative to the row as parent. 

If you're nesting a column inside a row which is inside another column that is inside another row as below:

```
<Row colPercent={5}>
    <Col size={10}>
      <Row colPercent={5}>
        <Col size={10}>
          <Text>
            This column is 25% of the width of the top level row
          </Text>
        </Col>
      </Row>
    </Col>
</Row>

```

The nested column's size will be the column size value (size, sm, md, lg) times the colPercent of its parent row, so, in effect, nested percentages, e.g. 50% of parent row's width which is 50% of its parent row's width, i.e. the nested column is 25% of the top level row's width. 

This nested percentages model applies to offsets, too, except offsets can also be negative.     

There are currently four offset props for `Column`. `offset`, `smOffset`, `mdOffset`, and `lgOffset`. The first one, `offset`, applies to all screen sizes.

The screen-size-prefixed size and offset props refer to the screen sizes they are active on (taking device pixel ratio into consideration.) 

|Prop |Screen Size|Real World Device   |
|---|---|---|
|sm | < 768px   | Phone (iPhone)  |
|md | 768px -  1023px  | Normal Tablet (iPad)  |
|lg | >=1024px  |  Big Tablet (iPad Pro)|

Example: 

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row colPercent={10}>
    <Col sm={5} md={3.3333} lg={2.5}>
        <Text>First Column</Text>
    </Col>
</Row>
```

On a phone the Column would take up 50% of the row's width.
On a normal tablet the Column would take up 33.333% of the row's width.
On a big tablet the Column would take up 25% of the row's width.

#### Hidden props.

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row colPercent={5}>
    <Col smHidden>
        <Text>First Column</Text>
    </Col>
</Row>
```

In this example the row and all of it's children will be hidden on small screens like phones, but it will appear on bigger screens like tablets.

Every screen size has a hidden prop associated with it.

Hidden props are all booleans. They default to false.

## Real world example using static (non-screen-sized-prefixed) size and offset props:

![demo](https://s14.postimg.org/4xd42iny9/Screen_Shot_2017-04-07_at_11.29.12_AM.png)

```
    <Row nowrap colPercent={6} style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          PREVIOUS ORDERS
          </Text>
        </Col>
        <Col size={5} offset={2}>
          <Text style={{ fontSize: 16, color: '#BD1206'}}>
            SEE ALL
          </Text>
        </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1}>
            <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>February 28, 2017</Text>
            <Row nowrap colPercent={5}>
              <Col size={1}>
                <FontAwesome name='shopping-cart' size={17} color='gray'/>
              </Col>
              <Col size={12} offset={.5}>
                <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>TAKEOUT ORDER</Text>
              </Col>
            </Row>
          <Text style={{fontSize: 16, color: '#0a0a0a'}}>Grilld Cheese Sandwich</Text>
          <Text style={{fontSize: 16, color: '#0a0a0a'}}>Key Lime Pie</Text>                                                                             
        </Col>
        <Col size={1} offset={3.85}>
          <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206"/>
        </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1}>
            <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>March 8, 2017</Text>
            <Row nowrap colPercent={5}>
              <Col size={1}>
                <FontAwesome name='cutlery' size={17} color='gray'/>
              </Col>
              <Col size={12} offset={.5}>
                <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>DINE-IN ORDER</Text>
              </Col>
            </Row>
          <Text style={{fontSize: 16, color: '#0a0a0a'}}>Linguini Alfredo</Text>                                                                          
        </Col>
        <Col size={1} offset={3.85}>
          <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206"/>
        </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1}>
            <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>March 9, 2017</Text>
            <Row nowrap colPercent={5}>
              <Col size={1}>
                <FontAwesome name='cutlery' size={17} color='gray'/>
              </Col>
              <Col size={12} offset={.5}>
                <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>TAKEOUT ORDER</Text>
              </Col>
            </Row>
          <Text style={{fontSize: 16, color: '#0a0a0a'}}>Double Cheese Burger</Text>                                                                          
        </Col>
        <Col size={1} offset={3.85}>
          <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206"/>
        </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          FAVORITE ITEMS
          </Text>
        </Col>
        <Col size={5} offset={1}>
          <Text style={{ fontSize: 16, color: '#BD1206'}}>
          ADD MORE
          </Text>
        </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={10} offset={1}>
        <Text style={{fontSize: 16, color: 'black'}}>
        Linguini Alfredo
        </Text>
      </Col>
      <Col size={1} offset={4}>
        <FontAwesome name='star' size={24} color='#BD1206'/>
      </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={10} offset={1}>
        <Text style={{fontSize: 16, color: 'black'}}>
        Double Cheese Burger
        </Text>
      </Col>
      <Col size={1} offset={4}>
        <FontAwesome name='star' size={24} color='#BD1206'/>
      </Col>
    </Row>
```