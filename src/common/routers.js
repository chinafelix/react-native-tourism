import React from 'react';
import {TabNavigator} from 'react-navigation'

import Home from '../pages/home'
import Buy from '../pages/buyer'
import Personal from '../pages/personal'

export const TabNav = TabNavigator(
  {
    Home: {screen: Home},
    Buy: {screen: Buy},
    Personal: {screen: Personal},
  },
  {
    tabBarOptions: {
      //当前选中的tab bar的文本颜色和图标颜色
      activeTintColor: '#4BC1D2',
      //当前未选中的tab bar的文本颜色和图标颜色
      inactiveTintColor: '#000',
      //是否显示tab bar的图标，默认是false
      showIcon: true,
      //showLabel - 是否显示tab bar的文本，默认是true
      showLabel: true,
      //是否将文本转换为大小，默认是true
      upperCaseLabel: false,
      //material design中的波纹颜色(仅支持Android >= 5.0)
      pressColor: '#788493',
      //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
      pressOpacity: 0.8,
      //tab bar的样式
      style: {
        backgroundColor: '#fff',
        paddingBottom: 1,
        borderTopWidth: 0.2,
        paddingTop:1,
        borderTopColor: '#ccc',
      },
      //tab bar的文本样式
      labelStyle: {
        fontSize: 11,
        margin: 1
      },
      //tab 页指示符的样式 (tab页下面的一条线).
      indicatorStyle: {height: 0},
    }
  }
);
