# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.29.88 & 0.29.89] - 2017-06-20
### Added
- Points-based `size` and `offset` props since absolute positioning is sometimes needed in a responsive layout, e.g. position of back arrow and hamburger menu on navigation bar. 
- `baseline` value for `vAlign` when supplied to Row
- This CHANGELOG.md

### Changed (Non-breaking)
- Fixed device-size-based offsets 
- Fixed regression in item alignment for RTL mode 
- Fixed handling of left/right margins (when set in style) rekative to offset value and RTL/LTR modes
- Refactored code for clarity and correctness
- Updated Readme to explain use of newly added features

### Changed (Breaking)

None.