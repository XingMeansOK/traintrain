import  {
  Dimensions
 } from 'react-native';

export const fletter=['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'];
export const itemheight=44;
export const sectionsperatorheight=3;
export const itemsperatorheight=2;
// export const screenwidth=111;
// export const screenheight=11111;
export const screenwidth=Dimensions.get('window').width;
export const screenheight=Dimensions.get('window').height;
// export var {screenheight,screenwidth} = Dimensions.get('window');
export var getWidthPercent = (percentage) => (screenwidth * percentage) / 100;
  //验证ANDROID_MINUS_HEIGHT==24？？？
export var getHeightPercent = (percentage) => ((screenheight-24) * percentage) / 100;
  //修改20
  var visibleListHeight=getHeightPercent(100)-20;
// export function getWidthPercent(percentage){
//   return((screenwidth * percentage) / 100);
// }


export const MAPPAGE = 'Mappage';
export const INPUTPAGE = 'Inputpage';
export const RESULTPAGE = 'Resultpage';
export const ANCHORPOINT = 300;
export const PEEKHEIGHT = 80;
export const BLUESTYLECOLOR = '#4389f2';
export const MAXSELECTEDPLAN = 3;
