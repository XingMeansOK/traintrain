import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import {
  Workspace,
  SMMapView,
  Point2D
} from 'imobile_for_reactnative';

var Point2DFac = new Point2D();
const { height, width } = Dimensions.get('window')

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
          // var datasource = await this.workspace.openDatasource({engineType:224,server:"http://192.168.0.126:8090/iserver/services/map-test0802/rest"});
          var dataset = await datasource.getDataset(0);

          this.mapControl = await this.mapView.getMapControl();
          console.log("mapControl"+this.mapControl.mapControlId);
          this.map = await this.mapControl.getMap();

          await this.map.setWorkspace(this.workspace);
          // var mapName = await this.workspace.getMapName(0);

          // await this.map.open(mapName);
          this.map.addLayer(dataset,true);
          await this.map.zoom(5000);
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

      <View style={styles.content}>
        <View style={styles.containerMap}>
          <SMMapView ref="mapView" style={styles.map} onGetInstance={this._onGetInstance}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  containerMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});
