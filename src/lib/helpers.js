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
};

const toPercent = (num) => (num * 100) + '%';

const getColumnWidth = (screenSize, props) => {
  switch(screenSize) {
    case 'small':
      if(props.sm){
        return toPercent(props.sm/props.rowSize);
      } else {
        return toPercent((props.size || 12)/props.rowSize);
      }
      break;
    case 'medium':
      if(props.md){
        return toPercent(props.md/props.rowSize);
      } else {
        return toPercent((props.size || 12)/props.rowSize);
      }
      break;
    case 'large':
      if(props.lg){
        return toPercent(props.lg/props.rowSize);
      } else {
        return toPercent((props.size || 12)/props.rowSize);
      }
      break;
    default:
      return toPercent((props.size || 12)/props.rowSize);
  }
};

const getColumnOffset = (screenSize, props) => {
  switch(screenSize) {
    case 'small':
      if(props.smOffset){
        return toPercent(props.smOffset/props.rowSize);
      } else if (props.offset) {
        return toPercent(props.offset/props.rowSize);
      } else {
        return 0;
      }
      break;
    case 'medium':
      if(props.mdOffset){
        return toPercent(props.mdOffset/props.rowSize);
      } else if (props.offset){
        return toPercent(props.offset/props.rowSize);
      } else {
        return 0;
      }
      break;
    case 'large':
      if(props.lgOffset){
        return toPercent(props.lgOffset/props.rowSize);
      } else if (props.offset){
        return toPercent(props.offset/props.rowSize);
      } else {
        return 0;
      }
      break;
    default:
      return 0;
  }
};

module.exports = {isHidden, getColumnWidth, getColumnOffset}