import {observable, computed, reaction} from 'mobx';
import pinyin from 'js-pinyin';
import ViewPager from 'react-native-viewpager';
import {CLASSIFYTYPES, FLETTER, MAXSELECTEDPLAN} from '../components/constant';

class AppStore {
  @observable stations = []; // 用于存放火车站站名及拼音
  @observable stationspinyin = [];
  @observable bottomSheetRef = null;// mappage下方活动页bottomsheetbehavior的引用
  @observable navigate = null; // react-navigation的navigate的引用
  @observable startInput=false;
  @observable destinationInput=false;
  @observable start = 'A'; // 用于存放用户输入的始发站
  @observable destination = ''; // 用于存放用户输入的终点站
  @observable selectedPlans = new Set([]); // 要在第一页展示的方案
  /*
  {
    "分类一": [
      {方案内容},
      {方案内容}
    ],
    "分类二": [
      {方案内容},
      {方案内容}
     ],
    "分类三": [
      {方案内容},
      {方案内容}
     ],
  }
  */
  /*
   planInfo， 推荐的乘车方案对象，
   多个成员，代表推荐的类型（时间最短，换乘最少这种），每个成员都是一个数组，数组元素是具体的一种乘车方案
  */
  @observable planInfo=null; // 从服务器请求得到的乘车方案
  @computed get viewPagerDataSource() {
    // 设置数据源
    let dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    dataSource.cloneWithPages(this.planInfo2);
    return dataSource
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
    return this.selectedPlans.size<MAXSELECTEDPLAN;
  }
}

export const appStore = new AppStore();
