# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) with the minor addition of Breaking vs Non-Breaking sections under 'Changed.'

This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Released]

## [0.41.0]

### Changed (breaking)

- fixed break points (see Readme)

### Added (non-breaking)

- setBreakPoints

## [0.40.0]

### Changed (breaking)

- alignLines on Row now has 'stretch' as default value (consistent with CSS spec)

## [0.39.0]

### Changed (breaking)

- Screen-size-specific _size_ and _hidden_ props now reference both the current screen width in case of Columns and the current screen height in case of Rows, both of which change with orientation. The _offset_ props only apply to Columns so they still refer to the current screen width. 

The following are the thresholds for these props:

  - SMALL_Width = 375 
  - MEDIUM_Width = 414 
  - LARGE_Width = 768
  - XLARGE_Width = 1024 

  - SMALL_Height = 667
  - MEDIUM_Height = 736
  - LARGE_Height = 1024 
  - XLARGE_Height = 1366 

### Changed (non-breaking)

- Rows and Cols can have position absolute (use for creating overlays, see Eample 2 for 2D positioning technique)

## [0.38.0]

- Do not use this release (design regression fixed in 0.39.0) 

## [0.37.0]

### Changed (breaking)

- default value for vAlign on Row is now `stretch`
- default value for hAlign on Col is now `stretch`
- Grid is {flex: 1} by default and Grid's style can be fully overriden with user styles

## [0.35.0] 2017-11-28

### Changed (breaking)

- Removed Row's reaction to its own layout changes. Screens must contain Grid at top of view hierarchy in order to respond to orientation changes. Non-orientation layout changes should be handled with Flexbox contsraints, no longer from JS. Simplifies code, usage and improves performance.

## [0.34.0] - 2017-11-22

### Changed (non-breaking)

- exposed .shown and .hidden as instance variables on Row and Col components

### Changed (breaking)

- replaced layoutEvent prop and having to build stateful components (and the ambiguity around where in the component tree to place layoutEvent) with a Grid component that sits at the very top of the UI component tree, above ScrollView, ListView and FlatList et al as an optional component for when managing state is necessary (e.g. adaptive layouts) 

## [Released]

## [0.33.0] - 2017-06-27

### Changed (non-breaking)

- fixed hide() and show() for columns in wrapped rows 
- made 'center' synonomous with 'middle' throughout

### Changed (breaking)

- columns and rows have overflow: 'hidden' by design 

## [Released]

## [0.32.01] - 2017-06-27

### Changed (non-breaking)

- fixed regression with Row update when no layoutEvent is specified

## [0.32.0] - 2017-06-27

### Added 

- `alignSelf` for Row and Column. See Readme. 

### Changed (non-breaking)

- updated the Universal Tiles demo show the number of each tile at the center so it's clear what is happening when tiles are removed and re-inserted and when orientation changes.  

[*Updated* Universal Tiles demo https://www.youtube.com/watch?v=OPUKz9wQ1Ks](https://www.youtube.com/watch?v=OPUKz9wQ1Ks)

## [0.31.0] - 2017-06-26

[Universal Tiles demo https://www.youtube.com/watch?v=x785Qib0ySg](https://www.youtube.com/watch?v=x785Qib0ySg)

### Removed (Breaking)

- `fullHeight` may be supplied as prop to Row ONLY as a convenience to enable vAlign to work on child Column(s) -- fullWidth on Row has been removed since it can interfere with Column's offset prop. 

- `fullWidth` may be supplied as prop to Column ONLY as a convenience to enable hAlign to work on child Row(s) -- fullHeight on Column has been removed since it can interfere with Row's size prop. 

### Added

- Rows can have size props to set high, both in percent and absolute points. See updated Readme.

- Example of Universal Tiles: responsive tiles with hide/show for Universal Apps. See updated Readme.

- Column and Row now have show() and hide() methods. See Example #1 in updated Readme for usage. 

### Changed (Breaking)

- Simplified interaction of props and styles: except for position, styles take precedence over props.

- 'wrap` is now the default behavior for Row. You must specify 'noWrap' to disable wrapping. 

### Changed (non-breaking)

- Updated Readme

- Fixed regression with non-grid props propagation 

## [0.30.0] - 2017-06-21

### Removed (Breaking)

- breakPoints prop was introduced as a screen-size-specific, point-valued _override_ for screen-size-specific percent-valued `size` props. Given that we have just added point-valued, screen-size-specific `size` and `offset` props in 0.29.88, we no longer need breakPoints. Mixing percent-valued and point-valued sizing info is an anti-pattern and it has been removed. Use of minWidth and minHeight is still supported as explicit override, but it's no longer exposed as a high level interface, since it's noth confusing and not necessary given the aforementioned additions. 

## [0.29.88 & 0.29.89] - 2017-06-20

### Added
- Points-based `size` and `offset` props since absolute positioning is sometimes needed in a responsive layout, e.g. position of back arrow and hamburger menu on navigation bar. 
- `baseline` value for `vAlign` when supplied to Row
- This CHANGELOG.md

### Changed (Non-breaking)
- Fixed device-size-based offsets 
- Fixed regression in item alignment for RTL mode 
- Fixed handling of left/right margins (when set in style) relative to offset value and RTL/LTR modes
- Refactored code for clarity and correctness
- Updated Readme to explain use of newly added features

### Changed (Breaking)

None.