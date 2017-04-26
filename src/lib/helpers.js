const isHidden = (screenSize, props) => {
  switch(screenSize) {
    case 'small':
      return props.smHidden ? true : false;
    case 'medium':
      return props.mdHidden ? true : false;
    case 'large':
      return props.lgHidden ? true : false;
    default:
      return false;
  }
}

const toPercent = (num) => num + '%';

const getColumnWidth = (screenSize, props) => {

  switch(screenSize) {
    case 'small':
      if (props.sm) {
        return toPercent(Math.max(props.sm, 0));
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return props.full ? toPercent(100) : undefined
      }

    case 'medium':
      if (props.md) {
        return toPercent(Math.max(props.md, 0));
      } else if (props.size !== undefined)  {
        return toPercent(Math.max(props.size, 0));
      } else {
        return props.full ? toPercent(100) : undefined
      }

    case 'large':
      if (props.lg) {
        return toPercent(Math.max(props.lg, 0));
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return props.full ? toPercent(100) : undefined
      }
  
    default:
      if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return props.full ? toPercent(100) : undefined
      }
  }
}

const getColumnOffset = (screenSize, props) => {

  switch(screenSize) {
    case 'small':
      if (props.smOffset) {
        return toPercent(props.smOffset)
      } else if (props.offset) {
        return toPercent(props.offset)
      } else {
        return 0;
      }
      break;
    case 'medium':
      if (props.mdOffset) {
        return toPercent(props.mdOffset)
      } else if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0;
      }
      break;
    case 'large':
      if (props.lgOffset) {
        return toPercent(props.lgOffset);
      } else if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0;
      }
      break;
    default:
      if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0
      }
  }
};

module.exports = {isHidden, getColumnWidth, getColumnOffset}