
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

`colPercent` in row - Accepts a number from 0 to 100. This number defines the size of each column as a percent of the parent element's width.  If you do not specify a number or you specify 0 the `colPercent` will default to 8.333333 which is 12 columns. 

`size` in column - Accepts a number from 0 to Infinity. This number defines how many columns wide the column should be where width of each column is the percent of its parent's width as defined in colPercent. If you do not specify a number or you input the number 0 the `size` will default to 12 columns wide. Since `size` accepts any number from 0 to Infinity, you can make your column as wide as you want, extending beyond the screen width if norwarp prop is set on the row. If nowrap is not set on the row, the column will wrap.  

sm, md, and lg are device-size-dependent 'size' values that are applicable to columns.

offset and [size]Offset is the same as for CSS flexbox grids, setting marginLeft (in percentage) on the number of columns (indicated by 'size') multiplied by column width (indicated by colPercent, which is relative to the parent's width) Since columns are positioned at flex-start within the row (by design) offset values will behave as expected. Offset values can be negative. 

**alignVertical** maybe supplied as prop to the row to vertically align the columns within the row. Possible values are: middle, top, bottom or fill.

**alignVertical** maybe also supplied as prop to the column to vertically align the items within the column. Possible values are: middle, top, bottom, space and distribute.

Remember that these are the basic rules from which complex layout behavior can emerge. 

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

## Column

```
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row colPercent={7}>
    <Col sm={6} md={4} lg={3}>
        <Text>First Column</Text>
    </Col>
</Row>
```

There are currently four size props for `Column`. `size`, `sm`, `md`, and `lg`. The first one, `size`, applies to all screen sizes.

The three size props refer to the screen sizes they are active on (taking device pixel ratio into consideration.) 

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

On a phone the Column would take up 50% of the screen.
On a normal tablet the Column would take up 33.333% of the screen.
On a big tablet the Column would take up 25% of the screen.

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