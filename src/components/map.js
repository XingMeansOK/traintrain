import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Workspace,
  SMMapView,
  Point2D
} from 'imobile_for_reactnative';

var Point2DFac = new Point2D();

export default class SMap extends Component {

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

          var datasource = await this.workspace.openDatasource({engineType:224,server:"http://supermapcloud.com"});
          var dataset = await datasource.getDataset(0);

          this.mapControl = await this.mapView.getMapControl();
          console.log("mapControl"+this.mapControl.mapControlId);
          this.map = await this.mapControl.getMap();

          await this.map.setWorkspace(this.workspace);
          // var mapName = await this.workspace.getMapName(0);

          // await this.map.open(mapName);
          this.map.addLayer(dataset,true);
          await this.map.zoom(200.0);
          // var point2D = await Point2DFac.createObj(12953693.6950684, 4858067.04711915);
          // await this.map.setCenter(point2D);
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
