
# Based on react-native-flexbox-grid with enhancements/modifications and improved usability/docs

## Row

```
import {Row} from 'react-native-responsive-grid';

<Row>
    <Text>My First Row</Text>
</Row>
```

`Row` is a component designed to represent a row. It utilizes `flex-direction: 'row'` to place it's children in rows. Typically we would put a `Column` inside of a `Row`, but it is not necessary. 

### Props

Row has two props. `size` and `nowrap`.

#### size

```
import {Column as Col, Row} from 'react-native-flexbox-grid';

<Row size={12}>
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

`cols` in row - Accepts a number. This number defines the number of columns the `Row` is divided into. If you do not specify a number or you input the number 0 the `cols` will default to 12. Since `cols` accepts any number, you can make your row contain pretty much any number of `Columns` (down to the floating-point precision limit: http://stackoverflow.com/questions/24126556/what-is-the-smallest-positive-floating-point-value) -- but usually 12 is a good number!

`size` in column - Accepts a number. This number defines how many columns wide the column should be where width of each column is the screen width divided by the cols value from the row component. If you do not specify a number or you input the number 0 the `size` will default to 12 columns wide. Since `size` accepts any number, you can make your column as wide as you want, assuming your row can wrap (or else it will extend beyond the width of the screen)

sm, md, and lg are device-size-dependent size values that are applicable to columns -- most used when the row can wrap and you wish to set different breaking points for different screen sizes.

offset and [size]Offset is the same as for CSS flexbox grids, setting marginLeft on the given column by the combined width of the number of columns indicated. 

alignVertical maybe supplied as prop to the row as: middle, top, or bottom.

#### nowrap

```
import {Row} from 'react-native-flexbox-grid';

//Will wrap Columns. Second Column's width will not protrude beyond row. It will wrap to the next Row.
<Row size={10}>
    <Col sm={5}>
      <Text>
        First Column
      </Text>
    </Col>
    <Col sm={6}>
      <Text>
        Second Column
      </Text>
    </Col>
</Row>

//Will not wrap Columns. Second Column's width will protrude beyond row.
<Row size={10} nowrap>
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

`nowrap` - Accepts a boolean. This boolean defines the style property `flexWrap`. If no prop is specified, then the defaults value will be `flexWrap: 'wrap'`. If you add the prop to the `Row` then the style value will equal flexWrap: `nowrap`. This makes it easy to see what rows will wrap at a glance.


## Column

```
import {Column as Col, Row} from 'react-native-flexbox-grid';

<Row size={12}>
    <Col sm={6} md={4} lg={3}>
        <Text>First Column</Text>
    </Col>
</Row>
```

### Props

Row has a two types of props. Column size props and hidden props.

#### Column size props.

```
import {Column as Col, Row} from 'react-native-flexbox-grid';

<Row size={12}>
    <Col sm={6} md={4} lg={3}>
        <Text>First Column</Text>
    </Col>
</Row>
```

There are currently three size props for `Column`. `sm`, `md`, and `lg`.

The three size props refer to the screen sizes they are active on (taking device pixel ratio into consideration.) 

|Prop |Screen Size|Real World Device   |
|---|---|---|
|sm | < 768px   | Phone (iPhone)  |
|md | 768px -  1023px  | Normal Tablet (iPad)  |
|lg | >=1024px  |  Big Tablet (iPad Pro)|

Example: 

```
import {Column as Col, Row} from 'react-native-flexbox-grid';

<Row size={12}>
    <Col sm={6} md={4} lg={3}>
        <Text>First Column</Text>
    </Col>
</Row>
```

On a phone the Column would take up 6 of 12 columns for 50% of the screen.
On a normal tablet the Column would take up 4 of 12 columns for 33% of the screen.
On a big tablet the Column would take up 3 of 12 columns for 25% of the screen.

#### Hidden props.

```
import {Column as Col, Row} from 'react-native-flexbox-grid';

<Row size={12}>
    <Col smHidden>
        <Text>First Column</Text>
    </Col>
</Row>
```

In this example the row and all of it's children will be hidden on small screens like phones, but it will appear on bigger screens like tablets.

Every screen size has a hidden prop associated with it.

Hidden props are all booleans. They default to false.