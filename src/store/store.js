import {observable, computed, reaction} from 'mobx';
import pinyin from 'js-pinyin';

class AppStore {
  @observable stations = []; // 用于存放火车站站名及拼音
  @observable stationspinyin = [];
  @observable searched = false; // 是否已经开始查询，也就是刚打开app是没有开始查询的
  @observable bottomSheetRef = null;// mappage下方活动页bottomsheetbehavior的引用
  @observable sectionListRef=null;
  @observable navigate = null; // react-navigation的navigate的引用
  @observable selectedPlan = 0; // 已选方案
  @observable startInput=false;
  @observable destinationInput=false;
  @observable autoInput=false;
  @observable start = 'A'; // 用于存放用户输入的始发站
  @observable destination = ''; // 用于存放用户输入的终点站

  @computed get sectionListIndex() {
    const fletter=['A','B','C','D','E','F','G','H','J','K',
          'L','M','N','P','Q','R','S','T','W','X','Y','Z'];
    let startpinyin=pinyin.getFullChars(this.start);
    let startpinyinfst=startpinyin.substr(0,1);
    let sectionindex=fletter.indexOf(startpinyinfst);
    // console.log(index);
    return sectionindex;
  }}

export const appStore = new AppStore();
