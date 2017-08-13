import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'mobx-react';
import Mappage from './components/mappage';
import Inputpage from './components/inputpage';
import Resultpage from './components/resultpage';
import {MAPPAGE, INPUTPAGE, RESULTPAGE} from './components/constant';
import {appStore} from './store/store';// 用于保存app所有的状态和数据（mobx的observable）
// // const是es6中用于定义常量的关键字

/*
  Mappage,Inputpage,Resultpage分别代表了app的三页

  pages[MAPPAGE]这种使用变量定义对象属性名称的方式是为了减少耦合
  比如，常量MAPPAGE代表了字符串'Mappage'
  pages[MAPPAGE] = { screen: Mappage };就相当于pages.Mappage = { screen: Mappage };
*/
let pages = {}; // 创建一个空的对象，let是es6中定义变量的关键字，具有块级作用域
pages[MAPPAGE] = { screen: Mappage };
pages[INPUTPAGE] = { screen: Inputpage };
pages[RESULTPAGE] = { screen: Resultpage };

/*
@deprecated StackNavigator返回一个组件  StackPages
并且可以使用screenProps传递props到每一个页面组件中
也就是Mappage，Inputpage，Resultpage都会得到这个screenProps

改用TabNavigator，超图的地图在StackNavigator中有bug，来回翻页几次就不能动了
*/
const TabPages = TabNavigator(pages,
  {
      swipeEnabled: false
  }
);
// <StackPages screenProps={appStore} />
class Traintrain extends React.Component {
  render() {
    return (
      <Provider store={appStore}>
        <TabPages/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Traintrain', () => Traintrain);
