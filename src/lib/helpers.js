const isHidden = (screenSize, props) => {
  switch(screenSize) {
    case 'small':
      return props.smHidden ? true : false;
    case 'medium':
      return props.mdHidden ? true : false;
    case 'large':
      return props.lgHidden ? true : false;
    case 'xlarge':
      return props.xlHidden ? true : false;
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
        return undefined
      }

    case 'medium':
      if (props.md) {
        return toPercent(Math.max(props.md, 0));
      } else if (props.size !== undefined)  {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
      }

    case 'large':
      if (props.lg) {
        return toPercent(Math.max(props.lg, 0));
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
      }

    case 'xlarge':
      if (props.xl) {
        return toPercent(Math.max(props.xl, 0));
      } else if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
      }
  
    default:
      if (props.size !== undefined) {
        return toPercent(Math.max(props.size, 0));
      } else {
        return undefined
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

    case 'medium':
      if (props.mdOffset) {
        return toPercent(props.mdOffset)
      } else if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0;
      }

    case 'large':
      if (props.lgOffset) {
        return toPercent(props.lgOffset);
      } else if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0;
      }

    case 'xlarge':
      if (props.xlOffset) {
        return toPercent(props.xlOffset);
      } else if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0;
      }

    default:
      if (props.offset){
        return toPercent(props.offset)
      } else {
        return 0
      }
  }
};

module.exports = {isHidden, getColumnWidth, getColumnOffset}