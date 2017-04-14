
# Responsive Grid for React Native

## Why?

Developing performant, responsive and fairly detailed 2D layouts with raw flexbox in React Native (prior to v0.42) used to take me hours per screen and resulted in markup and styles that were almost unmaintainable. While Flexbox itself maybe confusing to new comers, the lack of perofmant way to encode relative size info was the real pain. Then came React Native v0.42 and solved that problem. Since then there have been several folks who have made flexbox based responsive grids. I've taken one of those, namely, `react-native-flexbox-grid` by @rundmt, which is conceptually based on yet another library, `react-flexbox-grid`, and I modified it heavily to fit what I believe is a simpler mental model for 2D responsive layout, one that is based purely on percentages.

## What?

This Responsive Grid (for React Native) corrects the mental model for Grid based layout in that it eliminates the decoherence that results from using both an absolute column count together with relative sizing (!) by letting the developer specify the width of each grid column as a percentage of screen size and then specify the width of a given column in their layout as a multiple of that percentage. In addition to allowing the developer to think of everything in terms of percentages (i.e. only x:100 ratios, as opposed to x:N for the column width and x:100 for everything else), the developer won't have to know the screen size in pixels and guess N for the number of grid columns they need to have in order to get the width they desire per grid column (an indirect route.) They can instead use visual intuition about relative sizes to define the column width as a percentage of the current screen width, and derive the rest from there. 

I also found RTL (right-to-left) support (for Hebrew/Arabic apps) generally lacking in RN, so I added RTL layout support to this version (See RTL example)

## Philosophy

This presentation by Rich Hickey, creator of the Clojure language, sums up our phiosophy:

[simple made easy](https://github.com/matthiasn/talk-transcripts/blob/master/Hickey_Rich/SimpleMadeEasy.md). 


## Relative and Responsive Layout

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

`colPercent` in row - Accepts a number from 0 to 100. This number defines the width of a single grid column as a percentage of the row element's width.  If you do not specify a number or you specify 0 the `colPercent` will default to 8.333333 which results in 12 columns for the given row. See also Column Size and Offset. 

`size` in column - Accepts any positive number. This number defines how many grid columns wide the given layout column should be. If you do not specify a number or you input the number 0 the `size` will default to 8.333333 (1/12th the width of the row.) Since `size` accepts any number from 0 to Infinity, you can make your layout column as wide as you want, extending beyond the screen width if norwarp prop is set on the row. If nowrap is not set on the row, the column will wrap. Column `size` value defaults to 1 x `colPercent` if size is not specified. This way, the default column `size` is specfified by the row.

sm, md, and lg are device-size-dependent 'size' values that are applicable to columns.

`offset` and `[size]Offset` - Accepts any number. This number defines the marginLeft (or marginRight in csase of **rtl**) for the column in terms of the number of grid columns. Since grid columns have their parent row's justifyContent as flex-start (by design) and their alignItems set to flex-start (or flex-end for **rtl**) content in offsetted columns will snap to grid (in both ltr and rtl modes.) Offset values can also be negative, too. Column `offset` value defaults to 0.

**rightAlign** may be be supplied as prop in the column to set its alignItems to flex-end. This way content in offsetted columns will snap to grid in both in both the normal left-to-right (ltr) direction as well as thew right-to-left (rtl) directions. 

**alignVertical** may be supplied as prop to the row to vertically align the columns within the row. Possible values are: middle, top, bottom or fill. Note that the row's height must be larger than the hight of a given element or column within it for any of the **verticalAlign** values to have any visible effect on that element or column.  

**alignVertical** may be also supplied as prop to the column to vertically align the items within the column. Possible values are: middle, top, bottom, space and distribute. Note that the column's height must be larger than the combined hight of the elements (and/or rows) within it for any of the **verticalAlign** values to have any visible effect on those elements (and/or rows.) 

**rtl** may be supplied as prop to the row to both reverse the order of columns (or elements) inside a row as well as to **rightAlign** their contents. This is useful for Hebrew and Arabic layouts. **leftAlign** can be used on a colum in an rtl tagged row to exclude its content from **rightAlign** so the content can be left aligned to mimic the effect of **rightAlign** in normal ltr layouts. See also RTL Example.

To keep the grid structure simple and consistent, rows must only contain columns and columns must not contain other columns (they must be wrapped in rows within the column.) You may, however, nest things as deeply as you need. See also Column Size and Offset for how percentages are calculated when nesting grid structures.

These are the basic rules from which complex layout behavior may emerge. 

### nowrap

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

### Column Size and Offset

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

There are currently four offset props for `Column`. `offset`, `smOffset`, `mdOffset`, and `lgOffset`. The first one, `offset`, applies to all screen sizes. Offset values can be negative, too, and that's often used when rightAlign is supplied as prop to the column, so that content of offsetted column will snap to grid in the right-to-left direction just as it would in the left-to-right direction with a positive offset value.

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

### Hidden props.

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row colPercent={15}>
    <Col smHidden>
        <Text>First Column</Text>
    </Col>
</Row>
```

In this example the column and all of it's children will be hidden on small screens like phones, but it will appear on bigger screens like tablets. These props can be applied to either the row as a whole or to individual columns within it. 

Every screen size has a hidden prop associated with it.

Hidden props are all booleans. They default to false.

## Real world example using relative size and offset props:

![demo](https://s29.postimg.org/5k0mn45qf/Screen_Shot_2017-04-07_at_1.09.24_PM.png)

Note that in the markup below the right arrow icons have padding on the right and left (they should not but I guess they were converted from vector to image and that's how they got their extra padding) so a good way to deal with that is not by using fractional offset value as that will change with screen size while the font remains the same size which would misalign the icons relative to the right-aligned text like SEE ALL, ADD MORE and the start icon (which has no padding in it) -- the right to compensate for icons that have padding in them is by using absolute pixels in the style prob, e.g. left: 6. That is unless your font is responsive, in which case using fractional offset would be the right way.

```
    <Row nowrap colPercent={6} style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1} >
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          PREVIOUS ORDERS
          </Text>
        </Col>
        <Col size={5} rightAlign>
          <Text style={{ fontSize: 16, color: '#BD1206'}}>
            SEE ALL
          </Text>
        </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1} >
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
        <Col size={5} rightAlign>
          <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}} />
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
        <Col size={5} rightAlign>
          <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}}/>
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
        <Col size={5} rightAlign>
          <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}}/>
        </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          FAVORITE ITEMS
          </Text>
        </Col>
        <Col size={5} rightAlign>
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
      <Col size={5} rightAlign>
        <FontAwesome name='star' size={24} color='#BD1206'/>
      </Col>
    </Row>

    <Row nowrap colPercent={6} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={10} offset={1}>
        <Text style={{fontSize: 16, color: 'black'}}>
        Double Cheese Burger
        </Text>
      </Col>
      <Col size={5} rightAlign>
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
    <Row nowrap colPercent={6} style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={1} >
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          PREVIOUS ORDERS
          </Text>
        </Col>
        <Col size={5} rightAlign>
          <Text style={{ fontSize: 16, color: '#BD1206'}}>
            SEE ALL
          </Text>
        </Col>
    </Row>
```

### RTL Markup

Notice the offset values work in RTL direction now. The addition of .7 offset is to mimic the fact that the left margin in the LTR layout is smaller than the right margin in that layout, whereas it's the opposite in the RTL direction. So the .7 offset is used in RTL layout instead of the 1 offset, so alignment
is identical. 

```
    <Row nowrap rtl colPercent={6} style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <Col size={10} offset={.7} >
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
          PREVIOUS ORDERS
          </Text>
        </Col>
        <Col size={5} leftAlign>
          <Text style={{ fontSize: 16, color: '#BD1206'}}>
            SEE ALL
          </Text>
        </Col>
    </Row>
```