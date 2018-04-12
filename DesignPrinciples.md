## Design Principles

### _Simple Calculations_

This grid simplifies the mental model for grid based layouts by abandoning the format-based, columns-per-view approach (e.g. "12 column grid") and instead allowing the developer to specify the width of each grid column as a percentage of parent Row's width, so 10% meams 10 columns will fit inside the row, and 8.333% means 12 columns. 

### _Simple Layout_

While most React Native developers use `flex: n` (which is based on Facebook's Yoga layout algorithm) in place of the confusing mix of `flexGrow`, `flexShrink` and `flexBasis` (lots has been written about the Flexbox spec and its steep learning curve, e.g. [flex-grow is weird. Or is it?](https://css-tricks.com/flex-grow-is-weird/)) we still find it difficult to use `flex: n` since n is not a percentage of the parent view's computed or explicit width or height but a more complex constraint. We lose perspective on the item size relative to the size of its parent as we constrain the item sizes relative to each other rather that the size of each item relative to a single parent. It's like O(n) vs O(n^2) complexity for these two different sizing models in that instead of relating the size of each item to the size of its parent as a percentage (n steps), with `flex: n` we relate the size of each item to the size of each other (sibling) item (n^2 steps.) That's because we don't have a single scale (parent's width or height) to measure against. More importantly, we give up direct knowledge of each item's width as a percentage of the parent's width in favor of having comparative size factors for the sibling items. However, there are times when we'd like to have that, so this grid does not take that ability away from us. In fact, this grid relies heavily (under the hood) on Flexbox features like flexDirection, justifyContent, alignItems, and alignContent, but it uses them under the hood and combines them with a simple percentage-based layout model. This results in a layout system that is simple and predictable, yet powerful.

Having said that, there is an escape hatch in that we can still specify a numerical `flex: n` constraint in styles of Row and Column and even use bare Views mixed in with Row and Column components. 

_When To Use Flexbox Sizing:_ 

_In some cases when having an absolutely sized view followed (vertically or horizontally) by a view that must take up the remaining space, we'll need to use a wrapping grid element -- Column (to wrap vertical layout) or Row (to wrap horizontal layout) -- with style={{flex: 1}} and same on the Flex sized element that it wraps along with the absolutely sized element. However, such mixing of absolute and Flex sizing is not recommended as it won't lead to a fully responsive UI layout._

Other than that, the only other reason to use Flexbox grow/shrink sizing is for non-scrollable "squishy" UIs that shrink/grow elements instead of performing dynamic layout change and/or keeping things in proportion to screen width (rather tham to each other as is the case with Flexbox grow/shrink siing) via percentage based layout. You can still do that with this grid but you wouldn't want to use it if that was your only use case. 

### _Works in Both Directions_

Sometimes, we lay things out from left to right (LTR.) Other times, we might find it easier to lay things out from right to left (RTL.) I've found that RTL support to be generally lacking in both React and React Native grids, so I've added support for it. React makes it really simple. This can be very useful for apps with right-to-left text, i.e. Arabic, Aramaic, Azeri, Dhivehi/Maldivian, Hebrew, Kurdish (Sorani), Persian/Farsi, and Urdu.
