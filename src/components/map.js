import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Workspace,
  SMMapView,
} from 'imobile_for_reactnative';

export default class Map extends Component {

  //Required funtion for obtaining the MapView object.
  _onGetInstance = (mapView) => {
    this.mapView = mapView;
    this._addMap();
  }

  /**
   * 初始化地图  Function for initiating the Map
   * @private
   */
  _addMap = () => {
    try {
      //创建workspace模块对象
      //Create workspace object
      var workspaceModule = new Workspace();

      //加载工作空间等一系列打开地图的操作
      //Operations for loading workspace and opening map
      (async function () {
        try {
          this.workspace = await workspaceModule.createObj();

          await this.workspace.open("/SuperMap/SampleData/City/Changchun.smwu");

          this.mapControl = await this.mapView.getMapControl();
          this.map = await this.mapControl.getMap();

          await this.map.setWorkspace(this.workspace);
          var mapName = await this.workspace.getMapName(0);

          await this.map.open(mapName);
          await this.map.refresh();
        } catch (e) {
          console.error(e);
        }
      }).bind(this)();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <SMMapView ref="mapView" style={styles.map} onGetInstance={this._onGetInstance}/>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch',
  }
});
