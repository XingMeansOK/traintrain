import {observable, computed, reaction} from 'mobx';
import pinyin from 'js-pinyin';
import ViewPager from 'react-native-viewpager';
import {CLASSIFYTYPES, FLETTER, MAXSELECTEDPLAN} from '../components/constant';

class AppStore {
  @observable stations = []; // 用于存放火车站站名及拼音
  @observable stationspinyin = [];
  @observable timeincity=120;
  @observable timeinstation=60;
  @observable bottomSheetRef = null;// mappage下方活动页bottomsheetbehavior的引用
  @observable navigate = null; // react-navigation的navigate的引用
  @observable startInput=false;
  @observable destinationInput=false;
  @observable start = ''; // 用于存放用户输入的始发站
  @observable destination = ''; // 用于存放用户输入的终点站
  @observable selectedPlans = []; // 要在第一页展示的方案
  @observable currentRenderIndex = 0; // 当前渲染的方案
  @observable loadingRef = null;
  /*
   planInfo， 推荐的乘车方案对象，
   多个成员，代表推荐的类型（时间最短，换乘最少这种），每个成员都是一个数组，数组元素是具体的一种乘车方案
  */
  @observable planInfo=null; // 从服务器请求得到的乘车方案
  /*
  用于给resultpage提供数据源
  二维数组，第一层就是按照CLASSIFYTYPES中的分类顺序，第二层就是具体的方案
  */
  @computed get pages() {
  // 先对数据进行预处理(observable的数据类型不能给viewpager直接用？？？不清楚。。。)
    let pages = this.planInfo?
      CLASSIFYTYPES.map( TYPE => this.planInfo[TYPE] )
      : [];// 每种分类下都是一个数组(元素是每一个方案)

    return pages;
  }
  /*
  数组
  为第一页mappage的viewpager提供数据源
  */
  @computed get cabinet() {
    return this.selectedPlans.length<1? ['还没有选择方案']: this.selectedPlans.map(plan => plan);
  }
  /*
    将要在地图上渲染的方案
  */
  @computed get plan2Render() {
    if(this.selectedPlans.length>0) {
      return this.selectedPlans[this.currentRenderIndex];
    }
    return null
  }
  /*
  为bottomsheetcontent提供数据源
  */
  @computed get expandedInfo() {
    if(this.selectedPlans.length>0) {
      var allStations = null;
      let plan = this.selectedPlans[this.currentRenderIndex];
      if(typeof plan.trainNumber == 'string') {
        allStations = [...plan.stations[0]];
        allStations[0].additional = `${plan.trainNumber}上车`;
        allStations[allStations.length-1].additional = `${plan.trainNumber}下车`;
      }
      if(plan.trainNumber.length == 2) {
        allStations = [...plan.stations[0], ...plan.stations[1]];
        allStations[0].additional = `${plan.trainNumber[0]}上车`;
        allStations[plan.stations[0].length-1].additional = `${plan.trainNumber[0]}下车`;
        allStations[plan.stations[0].length].additional = `${plan.trainNumber[1]}上车`;
        allStations[allStations.length-1].additional = `${plan.trainNumber[1]}下车`;
      }
      if(plan.trainNumber.length == 3) {
        allStations = [...plan.stations[0], ...plan.stations[1], ...plan.stations[2]];
        allStations[0].additional = `${plan.trainNumber[0]}上车`;
        allStations[plan.stations[0].length-1].additional = `${plan.trainNumber[0]}下车`;
        allStations[plan.stations[0].length].additional = `${plan.trainNumber[1]}上车`;
        allStations[plan.stations[0].length+plan.stations[1].length-1].additional = `${plan.trainNumber[1]}下车`;
        allStations[plan.stations[0].length+plan.stations[1].length].additional = `${plan.trainNumber[2]}上车`;
        allStations[allStations.length-1].additional = `${plan.trainNumber[2]}下车`;
      }

      var mainStations = [];
      var mainStationIndex = [];
      allStations.forEach((station, index) => {
        if(station.hasOwnProperty('additional')) {
          mainStations.push(station.name);
          mainStationIndex.push(index);
        }
      })

      return {allStations, mainStations, mainStationIndex};
    }
    return null;
  }

  @computed get sectionListIndex() {
    let startpinyin=pinyin.getFullChars(this.start);
    let startpinyinfst=startpinyin.substr(0,1);
    let sectionindex=FLETTER.indexOf(startpinyinfst);
    // console.log(index);
    return sectionindex;
  }
  /*
  要展示的乘车方案是否已经满了,为真就可以继续选，假就不能选了
  */
  @computed get pickAbility() {
    return this.selectedPlans.length<MAXSELECTEDPLAN;
  }

  @computed get sectionListIndexSta() {
      var startpinyin=pinyin.getFullChars(this.start).toUpperCase();
      let startletterfst=startpinyin.substr(0,1)||'A';
      let sectionindex=(FLETTER.indexOf(startletterfst)!=-1) ? FLETTER.indexOf(startletterfst) : 22;
      var secindex = sectionindex;
      let itemindex=(this.start.length<2 || sectionindex==22 )? 0:getItemIndex();

      getItemIndex=() => {
        let find=false;
        let itemindex=0;
        for(let x=0;x<this.stations[sectionindex].station.pinyin.length;x++) {
          let reg = new RegExp(`^${pinyin.getFullChars(this.start).toUpperCase()}`,'i');
          if(reg.test(this.stations[sectionindex].station.pinyin[x])){
            find=true;
            itemindex=x;
          break;}
          else if(reg.test(this.stations[sectionindex].station.short[x])){
            find=true;
            itemindex=x;
          break;}
        }
        if(find==false){
          itemindex=0;}
        return itemindex;
      }
      return {sectionindex,itemindex};
      }
  @computed get sectionListIndexDes() {
      var despinyin=pinyin.getFullChars(this.destination).toUpperCase();
      let desletterfst=despinyin.substr(0,1)||'A';
      let sectionindex=(FLETTER.indexOf(desletterfst)!=-1) ? FLETTER.indexOf(desletterfst) : 22;
      let itemindex=(this.destination.length<2 || sectionindex==22 )? 0:getItemIndex();
      getItemIndex=() => {
        let find=false;
        let itemindex=0;
        for(let x=0;x<this.stations[sectionindex].station.pinyin.length;x++) {
          let reg = new RegExp(`^${pinyin.getFullChars(this.destination).toUpperCase()}`,'i');
          if(reg.test(this.stations[sectionindex].station.pinyin[x])){
            find=true;
            itemindex=x;
          break;}
          else if(reg.test(this.stations[sectionindex].station.short[x])){
            find=true;
            itemindex=x;
          break;}
        }
        if(find==false){itemindex=0;}
        return itemindex;
      }
      return {sectionindex,itemindex};
      }
}

export const appStore = new AppStore();
