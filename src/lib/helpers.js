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
  
  if (props.colPercent === undefined) {
    return '100%'
  }

  switch(screenSize) {
    case 'small':
      if (props.sm) {
        return toPercent(Math.max(props.sm, 0) * props.colPercent);
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0) * props.colPercent);
      } else {
        return toPercent(props.colPercent)
      }
      break;
    case 'medium':
      if (props.md) {
        return toPercent(Math.max(props.md, 0) * props.colPercent);
      } else if (props.size !== undefined)  {
        return toPercent(Math.max(props.size, 0) * props.colPercent);
      } else {
        return toPercent(props.colPercent)
      }
      break;
    case 'large':
      if (props.lg) {
        return toPercent(Math.max(props.lg, 0) * props.colPercent);
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0) * props.colPercent);
      } else {
        return toPercent(props.colPercent)
      }
      break;
    default:
      return toPercent(props.colPercent)
  }
}

const getColumnOffset = (screenSize, props) => {

  if (props.colPercent === undefined) {
    return 0
  }

  switch(screenSize) {
    case 'small':
      if (props.smOffset) {
        return toPercent(props.smOffset * props.colPercent);
      } else if (props.offset) {
        return toPercent(props.offset * props.colPercent);
      } else {
        return 0;
      }
      break;
    case 'medium':
      if (props.mdOffset) {
        return toPercent(props.mdOffset * props.colPercent);
      } else if (props.offset){
        return toPercent(props.offset * props.colPercent);
      } else {
        return 0;
      }
      break;
    case 'large':
      if (props.lgOffset) {
        return toPercent(props.lgOffset * props.colPercent);
      } else if (props.offset){
        return toPercent(props.offset * props.colPercent);
      } else {
        return 0;
      }
      break;
    default:
      return 0;
  }
};

module.exports = {isHidden, getColumnWidth, getColumnOffset}