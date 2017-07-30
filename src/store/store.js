import {observable, computed, reaction} from 'mobx';

class AppStore {
  @observable start = '出发站'; // 用于存放用户输入的始发站
  @observable destination = '终到站'; // 用于存放用户输入的终点站
  @observable stations = [];
}

export const appStore = new AppStore();
