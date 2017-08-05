import {observable, computed, reaction} from 'mobx';

class AppStore {
  @observable start = ''; // 用于存放用户输入的始发站
  @observable destination = ''; // 用于存放用户输入的终点站
  @observable stations = []; // 用于存放火车站站名及拼音
  @observable searched = false; // 是否已经开始查询，也就是刚打开app是没有开始查询的
  @observable bottomSheetRef = null;// mappage下方活动页bottomsheetbehavior的引用
  @observable navigate = null; // react-navigation的navigate的引用
  @observable selectedPlan = 0; // 已选方案
  @observable startInput=false;
  @observable destinationInput=false;
}

export const appStore = new AppStore();
