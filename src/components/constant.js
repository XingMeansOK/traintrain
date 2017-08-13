import  {
  Dimensions
 } from 'react-native';

export const FLETTER=['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'];
export const itemheight=44;
export const sectionsperatorheight=3;
export const itemsperatorheight=2;
// export const screenwidth=111;
// export const screenheight=11111;
export const screenwidth=Dimensions.get('window').width;
export const screenheight=Dimensions.get('window').height;
export const CLASSIFYTYPES = ['nonstop', 'once', 'twice'];
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
export const WHITE = '#FFFFFF';
export const MAXSELECTEDPLAN = 3;
export const URL = "http://[2001:250:4001:203:8c43:1025:7327:5459]:3000/query"; //宿舍用ip（ipv6）
// export const URL = "http://192.168.0.126:3000/users/";  // 这个是连telecarto3的时候的ip

// //plan2
export const HEADERCOLOR='#4389f2';
export const ICONCOLOR = '#4389f2';
export const BTNCOLOR = '#4389f2';
export const BORDERCOLOR = '#ccc';
export const INPUTCOLOR = '#fff';
export const BACKGRDCOLOR = '#fff';
export const GRAY = 'rgba(235,235,235,1.0)';
export const ITEMSPRTCOLOR ='rgba(247,247,247,1.0)';
export const SECSPRTCOLOR = 'rgba(235,235,235,1.0)';
export const DOWNBACKGRDCOLOR='#fff';
export const THUMBCOLOR = '#0f5fd7';
export const ONPRESSCOLOR='#0f5fd7';
export const LEFTTRACCOLOR='#13a9d6';
export const RIGHTTRACCOLOR='#bfbfbf';
export const TIMETIPCOLOR= '#999999';
