import {observable, computed, reaction} from 'mobx';

class AppStore {
  @observable start = '出发站'; // 用于存放用户输入的始发站
  @observable destination = '终到站'; // 用于存放用户输入的终点站
  @observable stations = []; // 用于存放火车站站名及拼音
  @observable searched = false; // 是否已经开始查询，也就是刚打开app是没有开始查询的
}

export const appStore = new AppStore();
