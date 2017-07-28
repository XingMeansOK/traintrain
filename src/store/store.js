import {observable, computed, reaction} from 'mobx';

class AppStore {
  @observable start = '出发站';
  @observable destination = '终到站';
}

export const appStore = new AppStore();
